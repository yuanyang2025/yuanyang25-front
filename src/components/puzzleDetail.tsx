// puzzle detail component

import { useEffect, useRef, useState } from "react";
import { PuzzleData } from "../data/constants";
import { Button, Collapse, Input, Popconfirm, Result, Skeleton, Spin, Tabs, notification } from "antd";
import { Hint, KeyData } from "../data/interface/puzzle";
import { GetDecKeyResp, PostSubmitResp, PostUnlockResp } from "../data/interface/network";
import { isOk, request } from "../utils/network";
import { cipher, decipher } from "../utils/cipher";
import ReactMarkdown from 'react-markdown';
import './puzzleDetail.css';
const { Panel } = Collapse;
import { UnlockFilled } from '@ant-design/icons';
import confetti from 'canvas-confetti';


export interface PuzzleDetailProp {
    puzzleId: number;
    keys: KeyData[];
    setKeys: (dec_id: number, new_key: string | undefined, new_price: number | undefined) => void;
};

export const PuzzleDetail = (props: PuzzleDetailProp) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [input, setInput] = useState<string>();
    const [select, setSelect] = useState<string>('content');
    const puzzle = PuzzleData.find((data) => data.puzzle_id === props.puzzleId);
    const keys = useRef(props.keys);
    const setKey = (dec_id: number, new_key: string) => {
        props.setKeys(dec_id, new_key, undefined);
        keys.current = keys.current.map((data) => {
            return data.dec_id === dec_id ? { key: new_key, dec_id: dec_id, price: data.price } : data
        });
    }
    const setPrice = (dec_id: number, new_price: number) => {
        props.setKeys(dec_id, undefined, new_price);
        keys.current = keys.current.map((data) => {
            return data.dec_id === dec_id ? { key: data.key, dec_id: dec_id, price: new_price } : data
        });
    }
    const getKey = (dec_id: number) => {
        return keys.current.find((data) => data.dec_id === dec_id)?.key;
    };
    const getPrice = (dec_id: number) => {
        return keys.current.find((data) => data.dec_id === dec_id)?.price;
    };

    const [api, contextHolder] = notification.useNotification();
    const onToast = (msg: string, detail: string, type: 'info' | 'success' | 'warning' | 'error') => {
        api[type]({
            message: msg,
            description: detail,
        });
    };
    const onConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 0.5, y: 0.5 },
        });
    };

    // puzzle content
    const [unlocked, setUnlocked] = useState(puzzle?.content.decipher_id !== undefined && getKey(puzzle?.content.decipher_id) !== undefined);
    const [disabled, setDisabled] = useState(puzzle?.content.decipher_id === undefined || getPrice(puzzle?.content.decipher_id) === -1);
    const pending = useRef(false);
    const onUnlock = async (dec_id: number | undefined) => {
        if (dec_id === undefined) {
            // unreachable
            console.error('unlock');
            return false;
        }
        setLoading(true);
        const resp = await request<PostUnlockResp>(`/api/unlock?decipher_id=${dec_id}`, "POST");
        if (!isOk(resp)) {
            console.error('unlock', resp.data);
            alert(resp.data);
        }
        else {
            if (resp.data.AlreadyUnlocked) {
                const old_key = resp.data.AlreadyUnlocked;
                // 测试用
                const cur_key = keys.current.find((data) => data.dec_id === dec_id)?.key;
                if (old_key !== cur_key) {
                    console.warn('unlock', old_key, cur_key);
                    setKey(dec_id, old_key);
                }
                setUnlocked(true);
            }
            else if (resp.data.Success) {
                const new_key = resp.data.Success.key;
                setKey(dec_id, new_key);
                setUnlocked(true);
                onToast('解锁成功', `花费点数${resp.data.Success.price}，剩余点数${resp.data.Success.new_balance}`, 'info');
            }
            else {
                // unreachable
                console.error('unlock');
            }
            setLoading(false);
        }
    };
    const onSubmit = async (answer: string | undefined) => {
        const key = keys.current.find((data) => data.dec_id === puzzle?.content.decipher_id)?.key;
        if (answer === undefined || key === undefined) {
            return;
        }
        pending.current = true;
        setInput(undefined);
        const ciphertext = cipher(answer, key);
        const resp = await request<PostSubmitResp>(`/api/submit_answer`, "POST", { puzzle_id: props.puzzleId, answer: ciphertext });
        if (!isOk(resp)) {
            console.error('submitans', resp.data);
            alert(resp.data);
        }
        else {
            if (resp.data.WrongAnswer) {
                const time = new Date(resp.data.WrongAnswer.try_again_after * 1000);
                onToast('答案错误', `扣除点数${resp.data.WrongAnswer.penalty_token}，
                    剩余点数${resp.data.WrongAnswer.new_balance}；请于${time.toLocaleString()}之后再试`, 'error');
                const ctime = new Date();
                const cnt = time.getTime() - ctime.getTime();
                if (cnt > 0) {
                    pending.current = true;
                    setTimeout(() => {
                        pending.current = false;
                    }, cnt);
                }
                else {
                    pending.current = false;
                }
            }
            else if (resp.data.TryAgainAfter) {
                const time = new Date(resp.data.TryAgainAfter * 1000);
                onToast('提交过快', `请于${time.toLocaleString()}之后再试`, 'warning');
                const ctime = new Date();
                const cnt = time.getTime() - ctime.getTime();
                if (cnt > 0) {
                    pending.current = true;
                    setTimeout(() => {
                        pending.current = false;
                    }, cnt);
                }
                else {
                    pending.current = false;
                }
            }
            else if (resp.data.HasSubmitted) {
                onToast('重复提交', '', 'info');
                pending.current = false;
            }
            else if (resp.data.PleaseToast) {
                onToast('提示', resp.data.PleaseToast, 'info');
                pending.current = false;
            }
            else if (resp.data.Success) {
                onToast('答案正确', `获得点数${resp.data.Success.award_token}，
                    目前点数${resp.data.Success.new_balance}`, 'success');
                if (resp.data.Success.finish) {
                    onToast('解密成功！', '', 'success');
                    setDisabled(true);
                    onConfetti();
                    setTimeout(() => {
                        window.location.reload();
                    }, 2500);
                }
                pending.current = false;
            }
            else {
                // unreachable
                console.error('submitans');
            }
        }

    }
    const getDecKey = async (dec_id: number | undefined) => {
        if (dec_id === undefined) {
            // unreachable
            console.error('getdeckey');
            return false;
        }
        const resp = await request<GetDecKeyResp>(`/api/decipher_key?decipher_id=${dec_id}`, "GET");
        if (!isOk(resp)) {
            console.error('getdeckey', resp.data);
            alert(resp.data);
        }
        else {
            if (resp.data.Price) {
                setPrice(dec_id, resp.data.Price);
                if (dec_id === puzzle?.content.decipher_id) {
                    setUnlocked(false);
                    setDisabled(false);
                }
            }
            else if (resp.data.Success || resp.data.Part || resp.data.Full) {
                const new_key = resp.data.Success || resp.data.Part || resp.data.Full || '';
                setKey(dec_id, new_key);
                if (dec_id === puzzle?.content.decipher_id) {
                    setUnlocked(true);
                    if (resp.data.Full) {
                        setDisabled(true);
                        setPrice(dec_id, -1);
                    }
                    else {
                        setDisabled(false);
                    }
                }
            }
            else {
                // unreachable
                console.error('getdeckey');
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        setSelect('content');
        const dec_id = puzzle?.content.decipher_id;
        if (dec_id === undefined) {
            return;
        }
        const key = getKey(dec_id);
        const price = getPrice(dec_id);
        if (key === undefined && price === undefined) {
            getDecKey(dec_id);
        }
        else {
            setUnlocked(key !== undefined);
            setDisabled(price === -1);
            // console.log(price, disabled.current, props.puzzleId);

            setLoading(false);
        }
    }, [props.puzzleId]);

    const PuzzleContent = (props: { skip?: boolean, hint?: Hint }) => {
        if (loading) {
            return <Spin />;
        }
        const dec_id = props.hint ? props.hint.cipher.decipher_id : (
            props?.skip ? puzzle?.skip.decipher_id : puzzle?.content.decipher_id);
        if (!dec_id || puzzle === undefined) {
            return <>unreachable</>;
        }
        let key = getKey(dec_id);
        let price = getPrice(dec_id);
        const onReload = async () => {
            setLoading(true);
            await getDecKey(dec_id);
            key = getKey(dec_id);
            price = getPrice(dec_id);
            if (price === -1) {
                setDisabled(true);
            }
            setLoading(false);
        };

        if (key === undefined) {
            if (price === undefined) {
                onReload();
            }
            return <div>{
                props.hint ? <div>
                    {/* <LockFilled /> */}
                    <Skeleton title={false} />
                    <Popconfirm
                        title={`是否确认花费 ${price} 解锁？`}
                        okText="解锁"
                        cancelText="取消"
                        onConfirm={() => onUnlock(dec_id)}
                    >
                        <Button type="default" key="unlock"
                            icon={<UnlockFilled />} style={{ marginBottom: '5px' }}>
                            {`解锁本条观测（${price}点数）`}
                        </Button>
                    </Popconfirm>
                </div> :
                    <Result
                        status="warning"
                        title={props?.skip ? '你尚未解锁答案' : '你尚未解锁该题'}
                        subTitle={price === undefined ? undefined : `解锁所需点数：${price}`}
                        extra={
                            [
                                <Popconfirm
                                    title={`是否确认花费 ${price} 解锁？`}
                                    okText="解锁"
                                    cancelText="取消"
                                    onConfirm={() => onUnlock(dec_id)}
                                >
                                    <Button type="primary" key="unlock">
                                        解锁
                                    </Button>
                                </Popconfirm>,
                                <Button key="reload" onClick={() => onReload()}>
                                    刷新
                                </Button>,
                            ]}
                    />
            }</div>;
        }
        return <div>{
            <ReactMarkdown>{
                decipher(props.hint ? props.hint.cipher.cipher : puzzle.content.cipher, key).join('\n')
            }</ReactMarkdown>
        }</div>;
    };
    const PuzzleHints = () => {
        if (!puzzle) {
            return <>unreachable</>;
        }
        if (loading) {
            return <Spin />;
        }
        useEffect(() => {
            puzzle.hints.forEach((hint) => {
                const dec_id = hint.cipher.decipher_id;
                const key = getKey(dec_id);
                const price = getPrice(dec_id);
                if (key === undefined && price === undefined) {
                    getDecKey(dec_id);
                }
            });
        }, [keys.current, puzzle]);
        return <Collapse bordered={false}>
            {puzzle.hints.map((hint) => {
                return <Panel key={hint.cipher.decipher_id} header={hint.title} >
                    <PuzzleContent hint={hint} />
                </Panel>;
            })}
        </Collapse>;
    }

    if (!puzzle) {
        return <>unreachable</>;
    }
    return <div style={{ flexGrow: 1, padding: '0px 10px', overflowX: 'auto', flexWrap: 'wrap' }}>
        {contextHolder}
        <h1 style={{ marginTop: '10px', marginBottom: '18px' }}>
            {puzzle.title}
        </h1>
        {/* <Divider style={{ marginTop: 0, marginBottom: 0 }} /> */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '50px' }}>
            <div style={{ backgroundColor: 'white', padding: '0 20px 30px 20px', marginBottom: '20px', flex: 1 }}>
                <Tabs
                    activeKey={select}
                    onChange={(active_key) => setSelect(active_key)}
                    items={[
                        {
                            label: '题目',
                            key: 'content',
                            children: loading ? <Spin className='content' /> : <PuzzleContent />,
                        },
                        {
                            label: '观测',
                            key: 'hint',
                            children: loading ? <Spin className='content' /> : <PuzzleHints />,
                            disabled: !unlocked,
                        },
                        {
                            label: '解析',
                            key: 'skip',
                            children: loading ? <Spin className='content' /> : <PuzzleContent skip />,
                            disabled: !unlocked,
                        },
                    ]}
                />
            </div>
            <Input
                style={{ display: disabled || !unlocked || loading ? 'none' : undefined }}
                placeholder={pending.current ? '提交过快，请稍后再试' : '请在此处输入答案'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPressEnter={() => onSubmit(input)}
                disabled={loading || disabled || !unlocked || pending.current}
            />
        </div>
    </div>;
};
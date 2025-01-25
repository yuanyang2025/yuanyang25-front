import {
  Button,
  Flex,
  Form,
  Input,
  message,
  Modal,
  notification,
  Spin,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { isOk, request } from "../utils/network";
import {
  CheckOracleResp,
  CreateOracleResp,
  GetOracleResp,
} from "../data/interface/network";
import { PuzzleTitle } from "../data/constants";
import React from "react";
import { InfoContext } from "../layout";

export interface OracleProp {
  puzzleId: number;
}

export const Oracle = (props: OracleProp) => {
  const context = React.useContext(InfoContext);
  if (!context) return null;

  const puzzleId = props.puzzleId;
  const [form] = Form.useForm();
  const [isOracleCreateOpen, setIsOracleCreateOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

  const [activeOracleList, setActiveOracleList] = useState<number[]>([]);
  const [inActiveOracleList, setInActiveOracleList] = useState<number[]>([]);

  const [currentOracle, setCurrentOracle] = useState<undefined | GetOracleResp>(
    undefined,
  );

  const [to_submit, setToSubmit] = useState<undefined | string>(undefined);

  const create_oracle = async () => {
    if (to_submit === undefined) {
      return;
    }

    let puzzle_id = puzzleId;
    const resp = await request<CreateOracleResp>(`/api/create_oracle`, "POST", {
      puzzle_id: puzzle_id,
      content: to_submit,
    });
    if (!isOk(resp)) {
      message.error("提交神谕失败！" + resp.data);
      return;
    } else if (resp.data == "TooManyActiveOracle") {
      console.error(resp.data);
      message.error("提交失败！您有太多未回复的神谕请求。请等待staff回复。");
    } else {
      console.log(resp.data);
      notification.open({
        message: "提交成功！",
        description: `花费点数${Math.abs(resp.data.Sucess.cost)}，当前点数${resp.data.Sucess.new_balance}
                    请等待staff回复您的提问！`,
        type: "success",
        showProgress: true,
        pauseOnHover: true,
      });
      context?.getInfo();
    }

    setIsOracleCreateOpen(false);
    onChange(puzzle_id);
  };

  const showModalDetail = async (id: number) => {
    const query = await request<GetOracleResp>(
      `/api/get_oracle?oracle_id=${id}`,
      "GET",
    );
    if (!isOk(query)) {
      message.error(`获取神谕${id}详细信息失败！` + query.data);
      setIsModalDetailOpen(false);
      return;
    }
    setCurrentOracle(query.data);
    form.resetFields();
    setIsModalDetailOpen(true);
  };

  const onChange = async (puzzle_id: number) => {
    setLoading(true);
    const query = await request<CheckOracleResp>(
      `/api/check_oracle?puzzle_id=${puzzle_id}`,
      "GET",
    );
    if (!isOk(query)) {
      message.error("查询神谕列表失败！" + query.data);
      setLoading(false);
    } else {
      let active = query.data.active;
      let inactive = query.data.inactive;
      active.sort((a, b) => +a - +b);
      inactive.sort((a, b) => +a - +b);
      setActiveOracleList(active);
      setInActiveOracleList(inactive);

      setLoading(false);
      message.success("查询神谕列表成功！");
    }
  };

  useEffect(() => {
    setLoading(true);
    onChange(props.puzzleId);
  }, [props.puzzleId]);

  return (
    <div>
      <Flex align="start" gap="middle" vertical>
        <Modal
          open={isOracleCreateOpen}
          onCancel={() => setIsOracleCreateOpen(false)}
          onOk={create_oracle}
          okText={"支付8888蛇币以提问"}
          cancelText={"取消"}
        >
          <TextArea
            styles={{ textarea: { height: 300 } }}
            placeholder="输入提问内容"
            showCount
            maxLength={200}
            onChange={(e) => setToSubmit(e.target.value)}
          />

          <p style={{ height: 50 }}>
            为了公平性，您的需要在提问时先支付8888蛇币作为押金。staff
            会评判提供信息的价值来定价，在回复时多退少补。
          </p>
        </Modal>

        <Flex align="start" gap="middle">
          <Button type="primary" onClick={() => setIsOracleCreateOpen(true)}>
            请求神谕
          </Button>
          <Button type="primary" onClick={() => onChange(puzzleId)}>
            查询神谕
          </Button>
        </Flex>

        {loading ? (
          <Spin />
        ) : (
          <div>
            {inActiveOracleList.length > 0 ? "staff 已经回复以下神谕:" : ""}
            <Flex wrap gap="small">
              {Array.from(inActiveOracleList, (data, i) => (
                <Button
                  key={i}
                  type="primary"
                  onClick={() => showModalDetail(data)}
                >
                  {data}
                </Button>
              ))}
            </Flex>
            {activeOracleList.length > 0 ? "请等待 staff 回复以下神谕：" : ""}
            <Flex wrap gap="small">
              {Array.from(activeOracleList, (data, i) => (
                <Button
                  key={i}
                  type="dashed"
                  onClick={() => showModalDetail(data)}
                >
                  {data}
                </Button>
              ))}
            </Flex>
            {activeOracleList.length + inActiveOracleList.length > 0
              ? ""
              : "未查询到记录"}
          </div>
        )}

        <Modal
          title={`神谕请求 ${currentOracle?.id} : 关于 ${currentOracle?.puzzle} ${currentOracle?.puzzle === undefined ? "" : PuzzleTitle.get(currentOracle.puzzle)}`}
          open={isModalDetailOpen}
          onClose={() => setIsModalDetailOpen(false)}
          onCancel={() => setIsModalDetailOpen(false)}
          footer={null}
          width={1000}
          destroyOnClose
        >
          <div>
            <Form form={form} name="getOracle" layout="vertical">
              <Form.Item label="提问内容：">
                <TextArea
                  disabled={true}
                  style={{ height: 120, resize: "none" }}
                  value={currentOracle?.query}
                />
              </Form.Item>
              <Form.Item label="押金：">
                <Input
                  disabled={true}
                  value={currentOracle?.cost}
                  variant="borderless"
                />
              </Form.Item>
              <Form.Item label="退费：">
                <Input
                  disabled={true}
                  value={
                    currentOracle?.active
                      ? "staff尚未处理退费"
                      : currentOracle?.refund
                  }
                  variant="borderless"
                />
              </Form.Item>
              <Form.Item label="实际花费：">
                <Input
                  disabled={true}
                  value={
                    currentOracle?.active
                      ? "staff尚未处理"
                      : String(
                          (currentOracle?.cost as number) -
                            (currentOracle?.refund as number),
                        )
                  }
                  variant="borderless"
                />
              </Form.Item>
              <Form.Item label="回答内容：">
                <TextArea
                  disabled={true}
                  value={
                    currentOracle?.active
                      ? "staff尚未回答"
                      : currentOracle?.response
                  }
                  style={{ height: 120, resize: "none" }}
                />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </Flex>
    </div>
  );
};

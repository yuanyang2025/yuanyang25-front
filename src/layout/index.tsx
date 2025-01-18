// page header

import React, { useEffect, useState } from 'react';
import './index.css'
import { Layout, Menu } from 'antd';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { GetInfoResp } from '../data/interface/network';
import { isOk, request } from '../utils/network';
import { login } from '../utils/login';

const { Header, Content } = Layout;
interface MenuItem {
    key: string;
    name: string;
    icon?: React.ReactNode;
};
export const Navbar = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const menu: MenuItem[] = [
        { key: '', name: '首页', icon: <HomeOutlined /> },
        { key: 'dashboard', name: '题目', icon: <HomeOutlined /> },
        { key: 'search', name: '搜索', icon: <SearchOutlined /> },
    ];
    const [info, setInfo] = useState<GetInfoResp>();
    const getInfo = async () => {
        const resp = await request<GetInfoResp>(`/api/info`, "GET");
        if (!isOk(resp)) {
            console.error('info', resp.data);
        }
        else {
            setInfo(resp.data);
            // console.log(resp.data);
        }
    };
    // TODO: 测试使用，之后删掉
    const TestUserLogin = async () => {
        // console.log("!");
        await login();
        getInfo();
    };
    useEffect(() => {
        TestUserLogin();
        // getInfo();
    }, []);

    return <Layout style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', top: 0, left: 0 }}>
            {/* <div className="logo" /> */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['dashboard']}>
                    {
                        menu.map((item) =>
                            <Menu.Item
                                key={item.key} icon={item.icon}
                                onClick={() => {
                                    navigate(`/${item.key}`);
                                }}
                                style={{ padding: '0 20px' }}
                            >
                                {item.name}
                            </Menu.Item>)
                    }
                </Menu>
                <div style={{ color: 'rgba(255, 255, 255, 0.65)' }}>{
                    info ? `拥有点数：${info.token_balance}` : undefined
                }</div>
            </div>
        </Header>

        <Content style={{ padding: '0 50px', marginTop: '64px', overflowY: 'auto' }}>
            <div style={{ padding: '20px 0' }}>{
                children
            }</div>
        </Content>
    </Layout>;
};
// index.tsx

import React, { useEffect, useState } from "react";
import "./index.css";
import { Layout, Menu } from "antd";
import {
  HomeFilled,
  LoginOutlined,
  MenuOutlined,
  TeamOutlined,
  // SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { GetInfoResp } from "../data/interface/network";
import { isOk, request } from "../utils/network";

const { Header, Content } = Layout;
interface MenuItem {
  key: string;
  name?: string;
  icon?: React.ReactNode;
}
export const Navbar = ({ children }: { children: React.ReactNode }) => {
  const isMobile = window.innerWidth < 768;
  const navigate = useNavigate();
  const currentPath = location.pathname.replace("/", ""); // 提取路径
  const menu: MenuItem[] = [
    { key: "", name: isMobile ? undefined : "首页", icon: <HomeFilled /> },
    {
      key: "dashboard",
      name: isMobile ? undefined : "题目",
      icon: <MenuOutlined />,
    },
    {
      key: "userLogin",
      name: isMobile ? undefined : "注册登录",
      icon: <LoginOutlined />,
    },
    {
      key: "team",
      name: isMobile ? undefined : "组队",
      icon: <TeamOutlined />,
    },
    /*{
      key: "search",
      name: isMobile ? undefined : "搜索",
      icon: <SearchOutlined />,
    },*/
  ];
  const [info, setInfo] = useState<GetInfoResp | undefined>();
  const getInfo = async () => {
    const resp = await request<GetInfoResp>(`/api/info`, "GET");
    if (!isOk(resp)) {
      console.error("info", resp.data);
      setInfo(undefined);
    } else {
      setInfo(resp.data);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <Layout
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          top: 0,
          left: 0,
          padding: isMobile ? "0 20px 0 20px" : undefined,
        }}
      >
        {/* <div className="logo" /> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[currentPath]}
          >
            {menu.map((item) => (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                onClick={() => {
                  navigate(`/${item.key}`);
                }}
                style={{ padding: isMobile ? "0 10px 0 20px" : "0 20px" }}
              >
                {item.name}
              </Menu.Item>
            ))}
          </Menu>

          <div style={{ color: "rgba(255, 255, 255, 0.65)" }}>
            {info
              ? (info.user_id ? "用户ID" + info.user_id : "") +
                "  " +
                (info.team_id ? "队伍ID" + info.team_id : "") +
                "  " +
                (info.token_balance ? "余额" + info.token_balance : "")
              : undefined}
          </div>
        </div>
      </Header>

      <Content
        style={{
          padding: isMobile ? "0 10px" : "0 50px",
          marginTop: "64px",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "20px 0" }}>{children}</div>
      </Content>
    </Layout>
  );
};

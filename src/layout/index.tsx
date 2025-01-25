// index.tsx

import React, { useEffect, useState } from "react";
import "./index.css";
import { Layout, Menu, Popover } from "antd";
import {
  HomeFilled,
  LoginOutlined,
  MenuOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  CustomerServiceOutlined,
  // SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { GetInfoResp } from "../data/interface/network";
import { isOk, request } from "../utils/network";

const { Header, Content } = Layout;

export const InfoContext = React.createContext<{ getInfo: () => void } | null>(
  null,
);

interface MenuItem {
  key: string;
  name?: string;
  icon?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export const Navbar = ({ children }: { children: React.ReactNode }) => {
  const isMobile = window.innerWidth < 768;
  const navigate = useNavigate();
  const currentPath = location.pathname.replace("/", ""); // 提取路径
  const menu: MenuItem[] = [
    { key: "", name: isMobile ? undefined : "首页", icon: <HomeFilled /> },
    {
      key: "dashboard",
      name: "题目",
      icon: <MenuOutlined />,
    },
    {
      key: "userLogin",
      name: "注册登录",
      icon: <LoginOutlined />,
    },
    {
      key: "team",
      name: "组队",
      icon: <TeamOutlined />,
    },
    {
      key: "staff",
      name: "回复oracle",
      icon: <CustomerServiceOutlined />,
    },
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
            style={{ width: "80%" }}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[currentPath]}
            items={menu.map((item) => {
              if (
                !(info?.privilege && info.privilege >= 2) &&
                item.key == "staff"
              ) {
                console.log("not staff");
                return null;
              }

              item.onClick = () => {
                navigate(`/${item.key}`);
              };
              item.style = { padding: isMobile ? "0 10px 0 20px" : "0 20px" };
              item.label = isMobile ? "" : item.name;
              return item;
            })}
          ></Menu>

          <div style={{ color: "rgba(255, 255, 255, 0.65)" }}>
            {isMobile ? (
              <Popover
                placement="bottomRight"
                title={info?.user_id ? "用户ID " + info.user_id : "未登录"}
                content={
                  info?.user_id ? (
                    <div>
                      <p>
                        {info?.team_id
                          ? "队伍ID " + info.team_id
                          : "不在队伍中"}
                      </p>
                      <p>
                        {info?.token_balance
                          ? "余额 " + info.token_balance
                          : "加入队伍后开启经济系统"}
                      </p>
                    </div>
                  ) : null
                }
              >
                <InfoCircleOutlined />
              </Popover>
            ) : info ? (
              `${info.user_id ? "用户ID " + info.user_id : ""}  ${
                info.team_id ? "队伍ID " + info.team_id : ""
              }  ${info.token_balance ? "余额 " + info.token_balance : ""}`
            ) : undefined}
          </div>
        </div>
      </Header>

      <InfoContext.Provider value={{ getInfo }}>
        <Content
          style={{
            padding: isMobile ? "0 10px" : "0 50px",
            marginTop: "64px",
            overflowY: "auto",
          }}
        >
          <div style={{ padding: "20px 0" }}>{children}</div>
        </Content>
      </InfoContext.Provider>
    </Layout>
  );
};

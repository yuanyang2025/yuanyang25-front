import { Button } from "antd";
import { request } from "../utils/network";
import { InfoContext } from "../layout";
import React from "react";

const LogoutButton = () => {
  const context = React.useContext(InfoContext);
  if (!context) return null;

  const logOut = async () => {
    await request<number>("/api/logout", "GET");
    context.getInfo();
  };

  return (
    <Button danger onClick={logOut}>
      退出登录
    </Button>
  );
};

export default LogoutButton;

import { Button } from "antd";
import { request } from "../utils/network";

const LogoutButton = () => {
  const logOut = async () => {
    await request<number>("/api/logout", "GET");
    window.location.reload();
  };

  return (
    <Button danger onClick={logOut}>
      退出登录
    </Button>
  );
};

export default LogoutButton;

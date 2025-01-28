import Alert from "antd/es/alert/Alert";

export const NoticeBoard = () => {
  return (
    <div>
      <Alert
        message="倒计时！"
        description="新春闯关即将开始！"
        showIcon
        type="info"
      />
      <br />
      <br />
    </div>
  );
};

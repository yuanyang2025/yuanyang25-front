import Alert from "antd/es/alert/Alert";

export const NoticeBoard = () => {
  return (
    <div>
      <Alert
        message="测试公告"
        description="这是一条测试公告文本。此公告仅能放置文字。"
        showIcon
        type="info"
      />
      <br />
      <br />
    </div>
  );
};

import { FloatButton, message } from "antd";
import React from "react";

import { DollarCircleFilled } from "@ant-design/icons";
import confetti from "canvas-confetti";
import { HeartTwoTone } from "@ant-design/icons";
import { InfoContext } from "../layout";

export const QueryBalanceButton: React.FC = () => {
  const context = React.useContext(InfoContext);
  if (!context) return null;

  const getInfo = async () => {
    const info = await context.getInfo();
    message.info("当前灵力值：" + String(info?.token_balance));
  };

  const queryBalance = async () => {
    await getInfo();
  };
  const onConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    });
    message.success("守塔姬给你放个烟花！要加油哦~");
  };
  return (
    <div>
      <FloatButton
        tooltip="查询当前灵力值"
        onClick={queryBalance}
        type="primary"
        icon={<DollarCircleFilled />}
        style={{ insetInlineEnd: 75 }}
      />
      <FloatButton
        onClick={onConfetti}
        type="primary"
        icon={<HeartTwoTone twoToneColor="#eb2f96" />}
        style={{ insetInlineEnd: 20 }}
        tooltip="放个烟花吗？"
      />
    </div>
  );
};

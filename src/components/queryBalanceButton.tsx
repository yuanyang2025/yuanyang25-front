import { FloatButton, message } from "antd";
import React, { useEffect, useState } from "react";
import { isOk, request } from "../utils/network";
import { GetInfoResp } from "../data/interface/network";
import { DollarCircleFilled } from "@ant-design/icons";

export const QueryBalanceButton: React.FC = () => {
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
  const queryBalance = () => {
    message.info("当前灵力值：" + String(info?.token_balance));
  };
  return (
    <div>
      <FloatButton
        tooltip="查询当前灵力值"
        onClick={queryBalance}
        type="primary"
        icon={<DollarCircleFilled />}
      />
    </div>
  );
};

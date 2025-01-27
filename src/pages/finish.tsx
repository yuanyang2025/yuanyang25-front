import { useEffect, useState } from "react";
import { RankResp } from "../data/interface/network";
import { request, isOk } from "../utils/network";
import { message, Spin, Input, Button } from "antd";
import React from "react";
import { InfoContext } from "../layout";
import confetti from "canvas-confetti";

export const FinishPage = () => {
  const context = React.useContext(InfoContext);
  if (!context) return null;

  const [loadingEmail, setLoadingEmail] = useState<boolean>(true);
  const [loadingRank, setLoadingRank] = useState<boolean>(true);
  const [rank, setRank] = useState<RankResp>("NotFound");
  const [email, setEmail] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");

  const onConfetti = () => {
    confetti({
      particleCount: 100,
      angle: -90,
      spread: 180,
      origin: { x: 0.5, y: 0 },
    });
  };

  const fetchRank = async () => {
    setLoadingRank(true);
    const query = await request<RankResp>(`/api/rank`, "GET");
    if (!isOk(query)) {
      setRank("NotFound");
    } else {
      setRank(query.data);
    }
    setLoadingRank(false);
  };

  const fetchEmail = async () => {
    setLoadingEmail(true);
    const query = await request<string>(`/api/my_email`, "GET");
    if (!isOk(query)) {
      setEmail("");
    } else {
      setEmail(query.data);
    }
    setLoadingEmail(false);
  };

  const submitEmail = async (email: string) => {
    const query = await request<string>(`/api/my_email`, "POST", {
      email: email,
    });
    if (!isOk(query)) {
      message.error("上传 email 失败");
    } else {
      setEmail(email);
      message.success("上传 email 成功");
    }
  };

  useEffect(() => {
    context.getInfo();
    fetchRank();
    fetchEmail();
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (newEmail.length > 100) {
      message.error("电子邮件长度不能超过 100 字符");
      return;
    }
    submitEmail(newEmail);
  };

  if (loadingRank) {
    return <Spin />;
  }

  if (rank == "NotFound") {
    return <h1> 未查询到此队伍的通关信息！</h1>;
  }

  const pass_date = new Date(rank.Success.time * 1000);

  onConfetti();

  return (
    <div style={{ padding: 100 }}>
      <h1> 恭喜通关！</h1>
      <h2> 通关排名： {rank.Success.rank_record} </h2>

      <h2> 通关时间： {pass_date.toLocaleString()}</h2>
      <div>
        {loadingEmail ? (
          <Spin size="small" />
        ) : (
          <h2>
            电子邮箱： {email ? email + "  请以此邮箱发送通关邮件。" : "未上传"}{" "}
          </h2>
        )}

        <div style={{ marginTop: 20, width: "500px" }}>
          <Input
            value={newEmail}
            onChange={handleEmailChange}
            placeholder="输入新的电子邮件"
            maxLength={100}
          />
        </div>
        <Button
          type="primary"
          onClick={handleSubmit}
          style={{ marginTop: 10 }}
          disabled={loadingEmail}
        >
          上传电子邮件
        </Button>
      </div>

      <p> 说明: 此排名中没有排除由于任何原因被剥夺获奖资格的队伍，仅供参考。</p>
      <p> 通关邮件要求： TODO</p>
    </div>
  );
};

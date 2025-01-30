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
      onConfetti();
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
      <div style={{textAlign:"center", fontWeight:"bold"}}>
        <p style={{fontStyle:"italic"}}>在不可见的虚无中，眼前的一切，化作金光照耀，降临在你随身的箱箧里。蛇影随诗的咏唱现形，咏诵《天演诀》，宝库中飞出：</p>
        <img src="https://maxpcimg.cc/i/2025/01/27/6797a834d7ed3.png" width="65%" style={{maxWidth: 800}}></img>
        <p style={{color:"gray"}}>衔月飞蛇勋章</p>
      </div>
      <p> 烛阴智库密钥（通关邮件要求）：</p>
      <p> 在您的通关邮件中，请带上您的：</p>
      <ul>
        <li> 队伍id；</li>
        <li> 用户id和用户名；</li>
        <li> 您的快递信息（收件人姓名/昵称、联系电话、收货地址）</li>
      </ul>
      <strong>我们会妥善保管您的个人信息。邮件内容仅旭岽一人可查看。</strong>
      <p>接下来是剧情时刻：</p>
      <div style={{fontStyle:"italic"}}>
        <p>
          &emsp;&emsp;整个空间最后坍缩成蛇形衔尾环，塔身化作无数发光鳞片消散于晨雾中，唯留林间回荡着岽半仙的声音：<br />
          &emsp;&emsp;“今日所见不过天道一鳞，求真之路永无止境...” 蛇从塔顶飞旋而下，又轻轻划过你的身侧，留下突然出现的岽半仙。<br />
          &emsp;&emsp;“你居然来了?”<br />
          &emsp;&emsp;今年春节，岽半仙特地早早地放了假，来这个塔欣赏风景。奇怪的是，自己没有发觉自己变小了。这下该怎么回去?<br />
          &emsp;&emsp;“我来助你!”那条徘徊盘旋的蛇飞了过来。“之前这位高人探索完这座塔，说不知道新春闯关怎么出，我们就满足了他的心愿，把你们诱骗了进来。虽然他苦等了快两年才买下META的答案，但是这毕竟是充满灵气的区域，外界才过两个小时。二位客官，老夫可以载你们一程......”<br />
          &emsp;&emsp;随着金光一闪，你们都被传送到了原先的森林里。<br />
          &emsp;&emsp;“不知道这次旅游特辑会不会比小原桌还长......”岽半仙抱怨道。对了，压岁钱!<br />
          &emsp;&emsp;“既然已经有了蛇的厚礼，那这份就给你省掉了......”说罢，岽半仙用神力跑了个飞快。<br />
        </p>
        <p style={{textAlign:"center", fontWeight:"bolder", fontSize:"230%"}}>
          &emsp;&emsp;蛇年新春闯关&emsp;&emsp;完<br />
          &emsp;&emsp;……<br />
          &emsp;&emsp;以下是STAFF名单：（TBD）<br />
        </p>
      </div>
    </div>
  );
};

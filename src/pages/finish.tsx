import { useEffect, useState } from "react";
import { RankResp } from "../data/interface/network";
import { request, isOk } from "../utils/network";
import { Spin } from "antd";
import React from "react";
import { InfoContext } from "../layout";
import confetti from "canvas-confetti";

export const FinishPage = () => {
  const context = React.useContext(InfoContext);
  if (!context) return null;

  const [loadingRank, setLoadingRank] = useState<boolean>(true);
  const [rank, setRank] = useState<RankResp>("NotFound");

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

  useEffect(() => {
    context.getInfo();
    fetchRank();
  }, []);

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

      <p> 说明: 此排名中没有排除由于任何原因被剥夺获奖资格的队伍，仅供参考。</p>
      <div style={{ textAlign: "center", fontWeight: "bold" }}>
        <p style={{ fontStyle: "italic", fontSize: "120%" }}>
          在不可见的虚无中，眼前的一切，化作金光照耀，降临在你随身的箱箧里。蛇影随诗的咏唱现形，咏诵《天演诀》，宝库中飞出：
        </p>
        <img
          src="https://maxpcimg.cc/i/2025/01/27/6797a834d7ed3.png"
          width="65%"
          style={{ maxWidth: 800 }}
        ></img>
        <p style={{ color: "gray" }}>衔月飞蛇勋章</p>
      </div>
      <p style={{ fontWeight: "bolder", fontSize: "160%" }}>
        {" "}
        但很可惜，你似乎来得太晚了，塔顶的宝藏都已被人瓜分完毕。
      </p>
      <p style={{ fontWeight: "bold", fontSize: "140%" }}>接下来是剧情时刻：</p>
      <div
        style={{ fontStyle: "italic", fontSize: "115%", fontWeight: "bold" }}
      >
        <p>
          &emsp;&emsp;整个空间最后坍缩成蛇形衔尾环，塔身化作无数发光鳞片消散于晨雾中，唯留林间回荡着岽半仙的声音：
          <br />
          &emsp;&emsp;“今日所见不过天道一鳞，求真之路永无止境...”
          蛇从塔顶飞旋而下，又轻轻划过你的身侧，留下突然出现的岽半仙。
          <br />
          &emsp;&emsp;“你居然来了?”
          <br />
          &emsp;&emsp;今年春节，岽半仙特地早早地放了假，来这个塔欣赏风景。奇怪的是，自己没有发觉自己变小了。这下该怎么回去?
          <br />
          &emsp;&emsp;“我来助你!”那条徘徊盘旋的蛇飞了过来。“之前这位高人探索完这座塔，说不知道新春闯关怎么出，我们就满足了他的心愿，把你们诱骗了进来。虽然他苦等了快两年才买下META的答案，但是这毕竟是充满灵气的区域，外界才过两个小时。二位客官，老夫可以载你们一程......”
          <br />
          &emsp;&emsp;随着金光一闪，你们都被传送到了原先的森林里。
          <br />
          &emsp;&emsp;“不知道这次旅游特辑会不会比小原桌还长......”岽半仙抱怨道。对了，压岁钱!
          <br />
          &emsp;&emsp;“既然已经有了蛇的厚礼，那这份就给你省掉了......”说罢，岽半仙用神力跑了个飞快。
          <br />
        </p>
        <p
          style={{
            textAlign: "center",
            fontWeight: "bolder",
            fontSize: "230%",
          }}
        >
          蛇年新春闯关&emsp;&emsp;完
          <br />
          ……
          <br />
          以下是STAFF名单：
          <br />
        </p>
        <table style={{ textAlign: "center", margin: "auto", border: 1 }}>
          <thead>
            <tr>
              <th>题目</th>
              <th>出题人</th>
              <th>美工 & 制作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>序章</td>
              <td>旭岽</td>
              <td>旭岽</td>
            </tr>
            <tr>
              <td>听力测试</td>
              <td>侦侦、雨木目</td>
              <td>Ocean、李骋昊</td>
            </tr>
            <tr>
              <td>鹅鹅鹅</td>
              <td>侦侦</td>
              <td>侦侦、白墨川</td>
            </tr>
            <tr>
              <td>不好笑</td>
              <td>侦侦、白墨川、Ocean、qwqe_mlcq、陈紫鲲</td>
              <td>侦侦</td>
            </tr>
            <tr>
              <td>衔尾卡牌</td>
              <td>侦侦</td>
              <td>侦侦、猎户座三星</td>
            </tr>
            <tr>
              <td>亦可赛艇</td>
              <td>白墨川、無馭</td>
              <td>白墨川、無馭</td>
            </tr>
            <tr>
              <td>新年新人设</td>
              <td>Ocean、侦侦、qwqe_mlcq、李骋昊、果树林</td>
              <td>Ocean、qwqe_mlcq、雨木目、果树林</td>
            </tr>
            <tr>
              <td>网络天文馆</td>
              <td>李骋昊</td>
              <td>李骋昊</td>
            </tr>
            <tr>
              <td>观流星雨</td>
              <td>白墨川、無馭</td>
              <td>白墨川、無馭、qwqe_mlcq、雨木目</td>
            </tr>
            <tr>
              <td>镜面世界</td>
              <td>6314_cat、李骋昊</td>
              <td>李骋昊</td>
            </tr>
            <tr>
              <td>送给叨友</td>
              <td>qwqe_mlcq、李骋昊</td>
              <td>qwqe_mlcq、李骋昊</td>
            </tr>
            <tr>
              <td>Meta：广厦之下</td>
              <td>侦侦、白墨川</td>
              <td>侦侦</td>
            </tr>
            <tr>
              <td colSpan={3}>前端部署：李骋昊、szm、白墨川</td>
            </tr>
            <tr>
              <td colSpan={3}>后端部署：李骋昊</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        另外欢迎您加入我们的
        <a href="https://qm.qq.com/q/calfd8PHWw">完赛QQ群：1014406570</a>
        ，验证答案是【声音在空气里燃成灰烬】。
      </p>
      <p>
        也欢迎您填写
        <a href="https://docs.qq.com/form/page/DUndBWXpObEhOSm9B?qqInfo=eyJtc2dJZCI6Ijc0NjcxNDIyODg4NTMxMTE1NjQiLCJjaGF0VHlwZSI6MiwicGVlclVpZCI6IjEwMTQ0MDY1NzAiLCJlbGVtSWQiOiI3NDY3MTQyMjg4ODUzMTExNTYwIiwic2VuZGVyVWlkIjoidV84Q1JxSGlHOUQ1LVBVOTBabUdjVVl3In0%3D&client=qqclient_online">
          赛后调查问卷
        </a>
        ，和出题组聊聊做完之后的感受~
      </p>
    </div>
  );
};

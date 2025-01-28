import Alert from "antd/es/alert/Alert";

export const NoticeBoard = () => {
  return (
    <div style={{ width: "device-width" }}>
      <Alert
        message="比赛开始！"
        description="蛇年新春闯关已于2025.01.08 20:00 正式开始！祝各位选手在灵蛇塔中取得佳绩，探寻出最终的奥秘~"
        showIcon
        type="info"
      />
      <br />
      <br />
      <Alert
        message="赛制说明"
        description={
          <div
            style={{ fontSize: "100%", marginLeft: "5%", marginRight: "5%" }}
          >
            <p
              style={{
                fontSize: "150%",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "6%",
                marginBottom: "4%",
                color: "red",
              }}
            >
              关于蛇年新春闯关
            </p>
            <p>首先预祝各位《原来是这样？！》的叨友们蛇年大吉！</p>
            <p>
              如果你已经准备好参与蛇年新春闯关，那以下信息应该是你希望了解的：
            </p>
            <p>
              1、首先，本次闯关会从除夕夜20:00开始，一直持续到大年初七20:00，
            </p>
            <p>2、你可以选择单人参加，也可以组队参加（人数上限3人）</p>
            <p>3、与龙年类似，本次闯关的获奖结算共有3种模式，但又略有区别：</p>
            <div style={{ textAlign: "center" }}>
              <img
                src="https://mmbiz.qpic.cn/mmbiz_png/yvMGNJZUwCfenq9icZBx1uPyIia3jicQk6y08Jspiax8uiaEc7VdmKDsYp4HjF5LyTx6jpTlQF6BnUXtc6SlwFcMsNw/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1"
                style={{ width: "100%" }}
              ></img>
            </div>
            <p
              style={{
                fontSize: "150%",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "6%",
                marginBottom: "4%",
                color: "red",
              }}
            >
              “灵蛇狂舞”通关竞速赛
            </p>
            <p>
              <strong style={{ color: "red" }}>获胜判定：</strong>队伍通关顺序
              <br />
              <br />
              <strong style={{ color: "red" }}>奖&emsp;&emsp;品：</strong>
              按照队伍人数瓜分奖池（原品店消费额度），总额999.99元。
              <br />
              <br />
              <ol>
                <li>
                  第一名队伍，每人获得奖金总额的15%（若单人参赛，奖金翻倍）
                </li>
                <br />
                <li>
                  第二名队伍，每人获得第一名队伍瓜分后剩余奖金总额的15%（若单人参赛，奖金翻倍）
                </li>
                <br />
                <li>
                  第三名队伍，每人获得第一、二名队伍瓜分后剩余奖金总额的15%，若此时奖金少于50元，则补足50元（若单人参赛，奖金翻倍）
                </li>
                <br />
                <li>
                  总奖池的剩余部分，按照“余额/50”的计算规则，对后续排名的队伍进行奖励，直至奖池全部消耗完毕。若奖品无法覆盖同队所有成员，则由主办方额外补足。
                </li>
                <br />
              </ol>
            </p>
            <p
              style={{
                fontSize: "150%",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "6%",
                marginBottom: "4%",
                color: "red",
              }}
            >
              “灵蛇修炼”灵力累积赛
            </p>
            <p>
              <strong style={{ color: "red" }}>获胜判定：</strong>
              截至大年初二20:00，<strong>灵力值</strong>
              累积最高的三支队伍获奖（若遇到重复获奖的情况，默认提供价值更高的奖品，另一份奖品按照规则顺延给其他队伍）
              <br />
              <br />
              <strong style={{ color: "red" }}>奖&emsp;&emsp;品：</strong>
              获奖队伍全体成员，每人获得<strong>一起跳黑洞</strong>
              限量款背包一个（价值88元）
              <br />
              <br />
            </p>
            <p
              style={{
                fontSize: "150%",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "6%",
                marginBottom: "4%",
                color: "red",
              }}
            >
              “通关灵塔”幸运大抽奖
            </p>
            <p>
              <strong style={{ color: "red" }}>获胜判定：</strong>
              截至大年初七20:00，所有在此期间实现通关的队伍。（除上述已经获奖队伍）
              <br />
              <br />
              <strong style={{ color: "red" }}>奖&emsp;&emsp;品：</strong>
              从所有队伍中抽取6支队伍，所有成员获得
              <strong>一起跳黑洞/如果宇宙是一年</strong>
              超大号鼠标垫（价值29.9元，款式随机）
              <br />
              <br />
            </p>
            <div style={{ textAlign: "center" }}>
              <img
                src="https://mmbiz.qpic.cn/mmbiz_jpg/yvMGNJZUwCfenq9icZBx1uPyIia3jicQk6yw1gDmu7OiaUR0PAAnWhv7AtIMnNdAbKXZ1PiacylItc27745oVcEDnrg/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1"
                style={{ width: "100%" }}
              ></img>
            </div>
            <p>
              &emsp;&emsp;对了，为了方便落单的探险者们组队，或者一起讨论本次闯关，小编又发现了一个集合石（两个活动专用群），欢迎使用！
            </p>
            <br />
            <br />
            <p>&emsp;&emsp;最后，祝所有探险者闯关愉快！</p>
            <br />
            <br />
          </div>
        }
        showIcon
        type="info"
      />
    </div>
  );
};

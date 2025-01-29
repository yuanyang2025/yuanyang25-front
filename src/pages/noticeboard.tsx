import Alert from "antd/es/alert/Alert";

export const NoticeBoard = () => {
  return (
    <div style={{ width: "device-width" }}>
      <Alert
        message="更新 & 用法提示"
        description={
          <div>
            <p>技术组现已发现部分题目问题和功能问题。</p>
            <p>本公告中将写入最新的更改。</p>
            <ul>
              <li>针对iOS用户的题目页加载错误已经修复。</li>
              <li>部分题目的文本已经修正。</li>
              <li>新增了注册页面关于用户ID的提示。</li>
              <li>新增了在题目页右下角的查询当前灵力值的按钮。</li>
              <li>修正了一部分题目的描述。相关更新说明已经补充。</li>
            </ul>
            <strong>
              另外请认真阅读首页的用法提示，不要将注册码/TOTP，用户名/用户ID混为一谈。用户状态在导航栏的右上角。
            </strong>
          </div>
        }
        showIcon
      />
      <br />
      <br />
      <Alert
        message="诚挚道歉！"
        description={
          <div>
            <p>
              在2025.01.29
              14时许，出题组发现有《不好笑》和《听力测试》的答案在跨队伍的群内泄露。为此出题组展开反作弊行动，但由于出题组内部沟通问题而导致出现了相当大范围的误封情况。
            </p>
            <p>
              出题组在此向所有队伍表示歉意。部分核实是误封的队伍已经恢复了答题和排名资格，并根据锁定时间长短给予了灵力值补偿。
            </p>
            <p>当前的处理结果如下：</p>
            <ul>
              <li>队伍74,163,161,90,50,73,126,91,92仍维持原处罚不变。</li>
              <li>队伍32,21,12,51,108的申诉复核通过，已恢复正常状态。</li>
              <li>
                未申请复核的队伍在北京时间2025.01.30
                00:00前向出题组发起申诉仍然有效。
              </li>
            </ul>
            <strong style={{ fontSize: "135%" }}>
              另外出题组判断后，决定在2025.01.29 22:30 CST
              向所有已经注册的队伍发送【50000
              灵力值】作为补偿。该全局补偿已经生效。
            </strong>
            <p>
              最后感谢各位的信任与支持。由于出题组水平有限，在题目、操作和网页设计上多有疏漏，恳请各位批评斧正。
            </p>
          </div>
        }
        showIcon
        type="success"
      />
      <br />
      <br />
      <Alert
        message="二号处罚公告"
        description={
          <div>
            <p>我们认为队伍91和92参与了在「不好笑」题目中的跨队合作。</p>
            <p>部分证据的描述如下。以下证据图片被处罚队伍可以联系staff获取。</p>
            <p>图1~2:</p>
            <p>名称为「咕咕咕」的群聊截图。其中讨论出了本题答案。</p>
            <p>图3:</p>
            <p>
              名称为「咕咕咕」的群聊截图。其中出现了一张包含「队伍ID
              92」的照片,有文字「我灵力回来了」。
            </p>
            <p>图4:</p>
            <p>
              名称为「咕咕咕」的群聊截图。其中出现了一封对公告一的处罚申诉的截图。
            </p>
            <p>图5:</p>
            <p>
              staff邮箱中的截图。说明和图4中回复时间、内容一致的回复是对队伍91的公告一申诉的回复。
            </p>

            <p>
              图1和图2说明这个群中讨论出了答案。图3证明队伍92在这个群中。图4和图5证明了队伍91在这个群中。
            </p>

            <div style={{ height: "30px" }} />
            <p>
              对这两个队伍，处以「取消获奖资格」和「扣除一百万灵力值」的处罚。本公告不接受申诉。
            </p>
            <p>2025-01-29 16:45 CST</p>
          </div>
        }
        showIcon
        type="error"
      />
      <br />
      <br />
      <Alert
        message="一号处罚公告"
        description={
          <div>
            <p>我们有证据证明「不好笑」题目中的不正当行为。</p>
            <p>
              将对以下14个队伍处以「取消获奖资格」和「扣除一百万灵力值」的处罚。
            </p>
            <p>队伍 32,21,12,51,108,74,163,161,90,50,73,126,92,91。</p>
            <p>如有疑问请通过邮箱申诉。</p>
            <p>2025-01-29 15:30 CST</p>
            <div style={{ height: "30px" }} />
            <p>补充：</p>
            <p>
              本公告的依据是「在提交「不好笑」」一题的最终答案前提交中间答案的记录。
            </p>
            由于以下队伍提交中间答案的数量过少，我们依然认定这些队伍「接受了其他队伍的答案」。
            <p>队伍 108,74,163,161,90,50,73,126。</p>
            <p>其他队伍因的本公告相关的处罚已经撤销。</p>
            <p>2025-01-29 16:38 CST</p>
          </div>
        }
        showIcon
        type="error"
      />
      <br />
      <br />
      <Alert
        message="诚信比赛提醒"
        description="技术组现已发现部分队伍存在交流答案的嫌疑。在此对所有队伍发出一次诚信比赛的提醒。若被查实将立即惩罚！"
        showIcon
        type="warning"
      />
      <br />
      <br />
      <Alert
        message="比赛违规处罚 & 警告"
        description={
          <div>
            <p style={{ fontWeight: "bolder", fontSize: "120%" }}>
              数次三番强调过的诚信问题，还是有人不能领会和遵守规范。
            </p>
            <strong style={{ color: "red" }}>
              经过技术组跟踪和策划组成员研判，以下队伍存在违规行为：
            </strong>
            <ul>
              <li>队伍 34</li>
              <li>队伍 41</li>
              <li>队伍 54</li>
              <li>队伍 101</li>
              <li>队伍 29</li>
              <li>队伍 160</li>
              <li>
                以上队伍存在交流未解锁题目内容、线索和答案的嫌疑。现在对以上队伍发出最后警告，若再次被发现违规将
                <strong style={{ color: "red" }}>立即移出排行榜！</strong>
              </li>
            </ul>
          </div>
        }
        showIcon
        type="warning"
      />
      <br />
      <br />
      <Alert
        message="比赛开始！"
        description="蛇年新春闯关已于2025.01.28 20:00 正式开始！祝各位选手在灵蛇塔中取得佳绩，探寻出最终的奥秘~"
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
                src="https://maxpcimg.cc/i/2025/01/28/6798c1f76292d.png"
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
                src="https://maxpcimg.cc/i/2025/01/28/6798c1f5a0ece.jpeg"
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

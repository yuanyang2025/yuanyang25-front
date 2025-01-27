// page home @ /
export const HomePage = () => {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#B5E5FB" }}>
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ width: "94%", margin: "3%" }}>
          <div style={{ textAlign: "center" }}>
            <img
              src="https://maxpcimg.cc/i/2025/01/27/67979f84dbbf6.png"
              width="100%"
              style={{
                marginTop: "1%",
                marginBottom: "7%",
              }}
              onClick={() => {
                window.location.href = "/dashboard";
              }}
              alt="点击进入灵蛇塔！"
              title="点击进入灵蛇塔！"
            />
          </div>
          <hr
            style={{
              height: "4px",
              backgroundColor: "black",
            }}
          />
          <div
            style={{
              fontSize: "16px",
              fontFamily: "Microsoft YaHei, Sans-Serif",
              fontWeight: "bold",
              textAlign: "center",
              color: "red",
            }}
          >
            <br />
            ！！！以下内容请务必认真阅读！！！
            <br />
            <br />
          </div>
          <hr
            style={{
              height: "4px",
              backgroundColor: "black",
            }}
          />
          <div
            style={{
              fontSize: "35px",
              fontFamily: "Microsoft YaHei, Sans-Serif",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            闯关指导
          </div>
          <div
            style={{
              fontSize: "16px",
              fontFamily: "Microsoft YaHei, Sans-Serif",
              margin: "20px",
            }}
          >
            <h2>一、闯关必备公众号</h2>
            <p>微信公众号：叨科学</p>
            <hr />
            <h2>二、关于用户系统</h2>
            <ol>
              <li>
                您首先应关注微信公众号“叨科学”，输入通过新手关后得到的口令以获取您的注册码。
              </li>
              <br />
              <li>
                点击上方导航栏中的【注册登录】前往登录页，根据提示完成登录或注册。
              </li>
              <br />
              <li>
                <strong>注意，首次登录的用户必须先完成注册。</strong>
              </li>
              <br />
              <li>
                登录后，您可以点击上方导航栏中的【组队】前往组队页。每支队伍成员上限为3人。
              </li>
              <br />
              <li>
                您可以根据提示选择创建或加入一个队伍；加入队伍时，请您从您的队友处获知
                <strong>队伍id</strong>和
                <strong>处在有效期内的队伍邀请码</strong>。
              </li>
              <br />
              <li>
                <strong>
                  需要注意的是，每个队伍仅需一人【创建队伍】，其余人【加入队伍】即可。
                </strong>
              </li>
              <br />
              <li>队伍人数多与少，并不会影响龙币获取与消费。</li>
              <br />
              <li>
                单人闯关视作一个队伍。但无论您是单人闯关或是团队协作，都需要先加入或创建队伍，否则无法提交答案。
              </li>
              <br />
              <li>
                此外，我们禁止跨队伍合作——一个参与者仅能参加一个队伍，且不允许与本队以外的选手交流任何相关题目。
              </li>
              <br />
              <li>
                我们的IT团队，会通过一些方法探知到作弊行为。一旦查实，队伍将不再参与最终排名，并将受到扣除灵力值的惩罚。
              </li>
              <br />
              <li>
                任何验证码都有时效（约4min），请及时使用验证码。若出现错误提示，请检查验证码是否拼错或验证码是否过期。
              </li>
              <br />
              <li>
                在开始作答或购买提示前，您可以随时退出队伍，但有任何答题或购买行为后，您将再也无法退出队伍。因此，请谨慎抉择。
              </li>
              <br />
              <li>
                若还有疑问，可以在微信公众号“叨科学”中输入“提示”或发送神谕（规范见第四部分）联系我们。
              </li>
              <br />
            </ol>
            <hr />
            <h2>三、网站操作</h2>
            <p>1、前往登录页按提示登录</p>
            <br />
            <p>
              2、登录后会自动跳转至组队页面。您可以根据提示创建或加入一个队伍，本次闯关的队伍人数上限为3人。
            </p>
            <br />
            <p>
              3、在阅读完本页面所有信息后，点击最上方的图片，进入灵蛇塔开始闯关！
            </p>
            <br />
            <p>
              4、系统仅记录队伍成员首次通过关卡的时间。即，队伍其余成员无需再次输入正确答案。
            </p>
            <br />
            <p>5、系统会自动同步关卡解锁进度和通过进度。</p>
            <br />
            <p>
              若还有疑问，可以向我们发送站内信或提起神谕（规范见第四部分）。
            </p>
            <hr />
            <h2>四、注意事项</h2>
            <ul>
              <li style={{ fontWeight: "bold" }} type="disc">
                背景介绍
              </li>
            </ul>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这是音频节目《原来是这样》的第九届新春闯关。你可以前往喜马拉雅APP或喜马拉雅小程序查询到该音频节目的全部期数和系列。作为受众为叨友的闯关活动，有相当一部分谜题围绕这系列节目进行展开。此外，其公众号叨科学上也有着许多篇科普文章，并开设了周边店铺。
            </p>
            <br />
            <ul>
              <li style={{ fontWeight: "bold" }} type="disc">
                赛制一览
              </li>
            </ul>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、本次赛制使用“FM”（Final
              Meta，即最终元谜题）完赛制。除了普通谜题外，每一区都有一个“元谜题”（Meta），
              需要解谜者利用这一轮次中已经获得的普通题目的答案。最终出现的元谜题即为FM。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、本次闯关中的题目由标题，引言（即flavor
              text，缩写为FT）和题面组成。
            </p>
            <br />
            <ul>
              <li style={{ fontWeight: "bold" }} type="disc">
                特别赛制
              </li>
            </ul>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、本次闯关每分可以获得一定量的灵力值，解出谜题也可以获得灵力值。您可以使用灵力值在题目页进行解锁题目、解锁提示、购买答案和请求神谕等操作。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、遇到对题目本身正确性的疑惑，欢迎发送神谕。神谕，即人工提示，位于题目页签中最右侧。点击即可切换到对应页签下，并可根据提示完成操作。您也可以通过邮件联系我们，联系我们的邮箱：yuanyang2024staff@126.com
              。
            </p>
            <p
              style={{
                color: "red",
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、特别注意：在发送邮件时，请务必带上您的
              队伍ID 和 您的用户id！
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、若您需要通过邮件对题目或线索内容进行反馈或希望指正，请在发件的主题中加上【留言】。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5、鉴于工作组人力有限，可能无法及时回复神谕和邮件，还请耐心等待并谅解。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6、我们保证没有线索需要查看网站的源码、与网页进行命令行交互、单步调试或者抓包来获取。同时，我们极力避免这样做可能带来的优势。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7、此外，请勿用编程手段和黑客技术与谜题及服务器进行交互，一旦发现将会严惩。
            </p>
            <br />
            <ul>
              <li style={{ fontWeight: "bold" }} type="disc">
                常用工具
              </li>
              <ul>
                <li type="circle">
                  当你只知道一个词或词组的一部分字母的时候，
                  <a href="https://nutrimatic.org">Nutrimatic</a>
                  可以在庞大的语料库里进行模式匹配，帮助你找到需要的词语。你可以输入“coAAr”来查询一个开头为co，结尾是r的五字母英文单词。
                </li>
                <li type="circle">
                  当你需要一些现代密码学加密/解密，文字/图片处理的时候，
                  <a href="https://www.toolhelper.cn/">锤子在线工具网</a>
                  里面提供的工具或许可以帮助你。
                </li>
                <li type="circle">
                  <a href="https://zi.tools">字统网</a>
                  可以让你更轻松的从组成汉字的笔画部件中找出对应的汉字。
                </li>
                <li type="circle">
                  你可以在
                  <a href="https://www.cross-plus-a.com/index.htm">Cross+A</a>
                  中搜索到一些纸笔谜题的规则。
                </li>
                <li type="circle">
                  如果你只做出了答案中的几个中文汉字，你可以在
                  <a href="https://www.gushiwen.cn">古诗文网</a>
                  中（或其他同类型网站）搜索到你可能需要的诗句。
                </li>
                <li type="circle">
                  有时候搜索引擎或人工智能也是个不错的选择。
                </li>
              </ul>
              <li>
                注意：对于部分题目，您不需要将所有的答案解出，可在持有部分“正确的中间答案”的情况下使用工具或搜索引擎模糊匹配。
              </li>
            </ul>
            <br />
            <ul>
              <li style={{ fontWeight: "bold" }} type="disc">
                提示系统
              </li>
            </ul>
            <ol>
              <li>
                如果您对某些题目毫无头绪，可以使用我们的提示系统，一切操作在网页端中进行。
              </li>
              <br />
              <li>
                对于一道题目的提示，您可以在题目页签中点击【提示】查看和解锁相应的提示。您可以看到预设提示提供的大致内容方向和需要消耗的灵力值，并根据自己的情况选择购买。
              </li>
              <br />
              <li>
                如果您想购买某一提示，直接展开提示并点击下方的解锁按钮，在确认消耗灵力值后即可查看提示。
              </li>
              <br />
              <li>
                如果想查询当前灵力值，导航栏右上角的状态栏会显示您当前剩余的灵力值数额。
              </li>
              <br />
            </ol>
            <hr />
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              最后，预祝您在闯关中取得佳绩！
            </p>
            <br />
            <p
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              愿好奇心长存！
            </p>
            <img
              src="https://maxpcimg.cc/i/2025/01/27/679797f28b552.jpg"
              width="100%"
              title="愿好奇心长存！"
              alt="愿好奇心长存！"
            />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

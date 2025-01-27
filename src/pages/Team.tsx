//page userRegister @ /userRegister
import React from "react";
import { Button, Form, Input, message, Space } from "antd";
import {
  CreateTeamResp,
  ExitTeamResp,
  JoinTeamResp,
  TeamTOTPResp,
} from "../data/interface/network";
import { isOk, request } from "../utils/network";
import { InfoContext } from "../layout";
import { TeamOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { redirectToNewPage } from "../components/puzzleDetail";

interface JoinTeamFieldType {
  teamId: string;
  inviteCode: string;
}

export const TeamManagementPage: React.FC = () => {
  const [form] = Form.useForm();

  const context = React.useContext(InfoContext);
  if (!context) return null;

  const handleCreateTeam = async () => {
    /*console.log("Creating team...");
    setCreateTeamMessage("队伍创建成功！");*/
    const resp = await request<CreateTeamResp>(`/api/create_team`, "POST");

    if (!isOk(resp)) {
      console.error("CreateTeam:", resp.data);
      message.error("创建队伍失败" + resp.data);
    } else {
      if ("Success" in resp.data) {
        message.success("队伍创建成功！您的队伍ID是" + resp.data.Success?.id);
      } else if ("AlreadyInTeam" in resp.data) {
        message.error(
          "您已经在队伍内！您的队伍ID是" + resp.data.AlreadyInTeam?.id,
        );
      } else {
        message.error("创建队伍失败：" + resp.data);
      }
    }
  };

  const handleJoinTeam = async (values: JoinTeamFieldType) => {
    // console.log("Joining team with:", values);
    // setJoinTeamMessage("成功加入队伍！");
    console.log(values.inviteCode);
    let teamId = Number(values.teamId);
    let vericode = values.inviteCode.replace(/\s+/g, "");
    let lower_vericode = vericode.toLowerCase();
    const resp = await request<JoinTeamResp>(`/api/join_team`, "POST", {
      team_id: teamId,
      vericode: lower_vericode,
    });

    if (!isOk(resp)) {
      console.error("加入队伍失败！：" + resp.data);
      message.error("加入队伍失败：" + resp.data);
    } else {
      if (resp.data === "AlreadyInTeam") {
        message.error("加入队伍失败：您已经在队伍内。");
      } else if ("TeamFull" === resp.data) {
        message.error("加入队伍失败：您所加的队伍已满员。");
      } else if ("AuthError" === resp.data) {
        message.error(
          "加入队伍失败：邀请码错误（请检查您所加队伍的邀请码是否正确和是否在有效期内）。",
        );
      } else if ("Success" in resp.data) {
        message.success("加入队伍成功！2秒后将跳转至题目页。");
        redirectToNewPage("/dashboard", 1500);
      } else {
        message.error("加入队伍失败：" + resp.data);
      }
    }
    context.getInfo();
  };

  const handleLeaveTeam = async () => {
    // console.log("Leaving team...");
    // setLeaveTeamMessage("已退出队伍！");
    const resp = await request<ExitTeamResp>(`/api/exit_team`, "POST");

    if (!isOk(resp)) {
      console.error("CreateTeam:", resp.data);
      message.error("请求失败：" + resp.data);
    } else {
      if (resp.data == "NotAllowed") {
        message.error("根据规则，此队伍已经不能退出。");
      } else if (resp.data == "NotInTeam") {
        message.error("退出队伍失败：您尚未加入任何一个队伍。");
      } else if ("Success" in resp.data) {
        message.warning("已退出队伍！");
      } else {
        message.error("退出队伍失败，未知错误。" + resp.data);
      }
    }
    context.getInfo();
  };

  const handleGetInviteCode = async () => {
    const resp = await request<TeamTOTPResp>(`/api/team_veri`, "GET");

    if (!isOk(resp)) {
      console.error("GetInviteCode:", resp.data);
      message.error("获取队伍邀请码失败" + resp.data);
    } else {
      if ("Success" in resp.data) {
        message.open({
          type: "success",
          content: "获取成功！您的队伍邀请码是：" + resp.data.Success.totp,
          duration: 12,
        });
      } else if ("NotInTeam" in resp.data) {
        message.error("获取队伍邀请码失败：您未加入队伍。");
      } else {
        message.error("获取队伍邀请码失败，未知错误。" + resp.data);
      }
    }
    context.getInfo();
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        className="login-form"
        {...formItemLayout}
        onFinish={handleJoinTeam}
        autoComplete="off"
      >
        <Space style={{ marginBottom: 20, display: "block" }}>
          <Button type="primary" onClick={handleCreateTeam}>
            创建队伍
          </Button>
        </Space>

        <Space style={{ marginBottom: 20, display: "block" }}>
          <Button type="primary" onClick={handleGetInviteCode}>
            获取队伍邀请码
          </Button>
        </Space>

        <Form.Item
          label="队伍ID"
          name="teamId"
          rules={[
            { required: true, message: "请输入队伍ID！" },
            { pattern: /^\d+$/, message: "队伍ID必须是自然数！" },
          ]}
        >
          <Input
            type="number"
            placeholder="请输入队伍ID"
            prefix={<TeamOutlined />}
          />
        </Form.Item>
        <Form.Item
          label="邀请码"
          name="inviteCode"
          rules={[
            { required: true, message: "请输入邀请码！" },
            () => ({
              validator(_, value) {
                const processed = value.replace(/\s+/g, "").toLowerCase();
                const hexRegex = /^[0-9a-f]{16}$/;
                if (hexRegex.test(processed)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    new Error("格式错误！邀请码是16位16进制数。空格会被忽略。"),
                  );
                }
              },
            }),
          ]}
        >
          <Input
            prefix={<UsergroupAddOutlined />}
            placeholder="请输入队伍邀请码"
            maxLength={19}
            onChange={(e) => {
              const input = e.target.value.replace(/\s+/g, "");
              const formatted =
                input
                  .toLowerCase()
                  .match(/.{1,4}/g)
                  ?.join(" ") || "";
              form.setFieldsValue({ inviteCode: formatted });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              加入队伍
            </Button>
          </Space>
        </Form.Item>

        <Space style={{ marginBottom: 20, display: "block" }}>
          <Button type="primary" danger onClick={handleLeaveTeam}>
            退出队伍
          </Button>
        </Space>
      </Form>
    </div>
  );
};

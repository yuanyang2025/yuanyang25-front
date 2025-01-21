//page userRegister @ /userRegister
import React, { useState } from "react";
import { Button, Form, Input, Space } from "antd";
import { CreateTeamResp, ExitTeamResp, JoinTeamResp, TeamTOTPResp } from "../data/interface/network";
import { isOk, request } from "../utils/network";

interface JoinTeamFieldType {
  teamId: string;
  inviteCode: string;
}

export const TeamManagementPage: React.FC = () => {
  const [form] = Form.useForm();
  const [createTeamMessage, setCreateTeamMessage] = useState<string>("");
  const [joinTeamMessage, setJoinTeamMessage] = useState<string>("");
  const [leaveTeamMessage, setLeaveTeamMessage] = useState<string>("");
  const [getInviteCodeMessage, setGetInviteCodeMessage] = useState<string>("");

  const handleCreateTeam = async() => {
    /*console.log("Creating team...");
    setCreateTeamMessage("队伍创建成功！");*/
    const resp = await request<CreateTeamResp>(`/api/create_team`, "POST")

    if (!isOk(resp)) {
      console.error("CreateTeam:", resp.data);
      setCreateTeamMessage("创建队伍失败" + resp.data);
    }
    else {
      if ("Success" in resp.data) {
        setCreateTeamMessage("队伍创建成功！您的队伍ID是" + resp.data.Success?.id);
      } 
      else if ("AlreadyInTeam" in resp.data) {
        setCreateTeamMessage("您已经在队伍内！您的队伍ID是"+ resp.data.AlreadyInTeam?.id);
      }
      else {
        setCreateTeamMessage("创建队伍失败：" + resp.data)
      }
    }
  };

  const handleJoinTeam = async(values: JoinTeamFieldType) => {
    // console.log("Joining team with:", values);
    // setJoinTeamMessage("成功加入队伍！");
    console.log(values.inviteCode)
    let teamId = Number(values.teamId)
    let vericode = values.inviteCode.replace(/\s+/g,"")
    let lower_vericode = vericode.toLowerCase()
    const resp = await request<JoinTeamResp>(`/api/join_team`, "POST", {
      team_id: teamId,
      vericode: lower_vericode
    });

    if (!isOk(resp)) {
      console.error("加入队伍失败！：" + resp.data)
      setJoinTeamMessage("加入队伍失败：" + resp.data)
    }
    else {
      if ("Success" in resp.data) {
        setJoinTeamMessage('加入队伍成功！')
      }
      else if ("AlreadyInTeam" in resp.data) {
        setJoinTeamMessage('加入队伍失败：您已经在队伍内。')
      }
      else if ("TeamFull" in resp.data) {
        setJoinTeamMessage('加入队伍失败：您所加的队伍已满员。')
      }
      else if ("AuthError" in resp.data) {
        setJoinTeamMessage('加入队伍失败：邀请码错误（请检查您所加队伍的邀请码是否正确和是否在有效期内）。')
      }
      else {
        setJoinTeamMessage('加入队伍失败：' + resp.data)
      }
    }
  };

  const handleLeaveTeam = async() => {
    // console.log("Leaving team...");
    // setLeaveTeamMessage("已退出队伍！");
    const resp = await request<ExitTeamResp>(`/api/exit_team`, "POST")

    if (!isOk(resp)) {
      console.error("CreateTeam:", resp.data);
      setLeaveTeamMessage("退出队伍失败" + resp.data);
    }
    else {
      if ("Success" in resp.data) {
        setLeaveTeamMessage("已退出队伍！");
      } else {
        setLeaveTeamMessage("退出队伍失败，未知错误。"+ resp.data);
      }
    }
  };

  const handleGetInviteCode = async() => {
    const resp = await request<TeamTOTPResp>(`/api/team_veri`, "GET");
    
    if (!isOk(resp)) {
      console.error("GetInviteCode:", resp.data);
      setGetInviteCodeMessage("获取队伍邀请码失败" + resp.data);
    } else {
      if ("Success" in resp.data) {
        setGetInviteCodeMessage("队伍邀请码（约4min内有效）是：" + resp.data.Success.totp);
      }
      else if ("NotInTeam" in resp.data) {
        setGetInviteCodeMessage("获取队伍邀请码失败：您未加入队伍。");
      }
      else {
        setGetInviteCodeMessage("获取队伍邀请码失败，未知错误。"+ resp.data);
      }
    }
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
      注：这个页面还只是个样子货，没有接入API。
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
          <span>{createTeamMessage}</span>
        </Space>

        <Space style={{ marginBottom: 20, display: "block" }}>
          <Button type="primary" onClick={handleGetInviteCode}>
            获取队伍邀请码
          </Button>
          <span>{getInviteCodeMessage}</span>
        </Space>

        <Form.Item
          label="队伍ID"
          name="teamId"
          rules={[
            { required: true, message: "请输入队伍ID！" },
            { pattern: /^\d+$/, message: "队伍ID必须是自然数！" },
          ]}
        >
          <Input type="number" placeholder="请输入队伍ID" />
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
            <span>{joinTeamMessage}</span>
          </Space>
        </Form.Item>

        <Space style={{ marginBottom: 20, display: "block" }}>
          <Button type="primary" danger onClick={handleLeaveTeam}>
            退出队伍
          </Button>
          <span>{leaveTeamMessage}</span>
        </Space>
      </Form>
    </div>
  );
};

//page userRegister @ /userRegister

import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import type { FormProps } from "antd";
import * as CryptoJS from "crypto-js";
import { isOk, request } from "../utils/network";
import { RegisterResp } from "../data/interface/network";

type FieldType = {
  username: string;
  password: string;
  token: string;
};

export const UserRegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const [usernamelength, setUsernameLength] = useState<number>(0);
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

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    let username = values.username;
    let password = values.password;
    let token = values.token;
    /* let data: Array<string> = [username, password, token]
        return data */
    const cpass = CryptoJS.SHA256(password).toString();
    const resp = await request<RegisterResp>(`/api/register`, "POST", {
      username: username,
      token: token,
      password: cpass,
    });
    if (!isOk(resp)) {
      console.error("Register:", resp.data);
      alert(resp.data);
    } else {
      if (resp.data.Success) {
        alert("注册/重置密码成功!");
        //重新加载页面以更新页面上方的信息
        window.location.href = "/userLogin";
      } else {
        alert("注册码解析失败!请检查是否已在公众号上获取最新的注册码。");
      }
    }
  };

  return (
    <div>
      <Form
        form={form}
        name="register"
        className="register-form"
        {...formItemLayout}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: "用户名不能为空!",
            },
          ]}
        >
          <Input
            // username
            maxLength={100}
            placeholder="请输入用户名："
            onChange={(e) => setUsernameLength(e.target.value.length)}
            suffix={<span>{usernamelength}/100</span>}
          />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "密码不能为空!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            // password
            placeholder="请输入密码："
          />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "密码不能为空！",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                } else
                  return Promise.reject(new Error("两次输入的密码不一致!"));
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            // confirm password
            placeholder="请再次输入密码："
          />
        </Form.Item>
        <Form.Item
          label="注册码"
          name="token"
          rules={[
            {
              required: true,
              message: "请填写注册码！",
            },
          ]}
        >
          <Input placeholder="请输入注册码：" />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            注册 / 重置密码
          </Button>
          &nbsp;&nbsp;&nbsp; <a href="/userLogin">注册好了？去登录</a>
        </Form.Item>
      </Form>
    </div>
  );
};

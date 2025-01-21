// page userLogin @ /userLogin

import { Button, Form, Input, Radio, Flex } from "antd";
import React, { useState } from "react";
import type { FormProps } from "antd";
import * as CryptoJS from "crypto-js";
import { isOk, request } from "../utils/network";
import { LoginResp } from "../data/interface/network";
import LogoutButton from "./userLogout";

type LoginFieldType = {
    userId: string;
    password?: string;
    totp?: string;
};

export const UserLoginPage: React.FC = () => {
    const [form] = Form.useForm();
    const [authMethod, setAuthMethod] = useState<"password" | "totp">("password");
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

const onFinish: FormProps<LoginFieldType>["onFinish"] = async (values) => {
    console.log("Button Pressed!");
    const { userId, password, totp } = values;
    const data = password
    ? CryptoJS.SHA256(password).toString()
    : totp
        ? totp.replace(/\s+/g, "").toLowerCase()
        : "";

    let method;

    if (password) {
    method = "Password";
    } else {
    method = "Totp";
    }

    const resp = await request<LoginResp>(`/api/login`, "POST", {
        userid: parseInt(userId),
        auth: {
        method: method,
        data: data,
    },
    });

    if (!isOk(resp)) {
        console.error("Login:", resp.data);
        alert(resp.data);
    } else {
    if (resp.data.Success) {
        alert("登录成功!");
        //重新加载页面以更新页面上方的ID等信息
        window.location.href = "/";
    } else {
        alert("登录失败");
    }
    }
};

return (
    <div>
            <Form
            form={form}
            name="login"
            className="login-form"
            {...formItemLayout}
            onFinish={onFinish}
            autoComplete="off"
        >
        <Form.Item<LoginFieldType>
            label="用户ID"
            name="userId"
            rules={[
            {
                required: true,
                message: "用户ID不能为空!",
            },
        ]}
        >
        <Input type="number" placeholder="请输入用户ID" />
        </Form.Item>
        <Form.Item label="验证方式" name="authMethod" initialValue="password">
            <Radio.Group onChange={(e) => setAuthMethod(e.target.value)}>
            <Radio value="password">密码</Radio>
            <Radio value="totp">TOTP</Radio>
            </Radio.Group>
        </Form.Item>
        {authMethod === "password" && (
            <Form.Item<LoginFieldType>
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
            <Input.Password placeholder="请输入密码" />
            忘记密码？选择TOTP验证码方式  或者<a href="/userRegister">去修改密码</a>
        </Form.Item>
        )}
        {authMethod === "totp" && (
            <Form.Item<LoginFieldType>
            label="TOTP"
            name="totp"
            rules={[
                {
                required: true,
                message: "TOTP 不能为空!",
                },
            () => ({
                validator(_, value) {
                const processed = value.replace(/\s+/g, "").toLowerCase();
                const hexRegex = /^[0-9a-f]{16}$/;
                if (hexRegex.test(processed)) {
                    return Promise.resolve();
                } else {
                    return Promise.reject(
                        new Error("格式错误! TOTP是16位16进制数。空格会被忽略。"),
                    );
                }
                },
            }),
            ]}
        >
            <Input
                placeholder="请输入在叨科学上发送「TOTP」的回复内容。"
                maxLength={19} // 每 4 个字符加一个空格，总长度为 19
                onChange={(e) => {
                const input = e.target.value.replace(/\s+/g, ""); // 删除空格
                const formatted =
                input
                    .toLowerCase() // 转为小写
                    .match(/.{1,4}/g) // 每 4 个字符分组
                    ?.join(" ") || ""; // 插入空格
                form.setFieldsValue({ totp: formatted }); // 更新表单字段值
            }}
            />
        </Form.Item>
        )}
        <Form.Item {...tailFormItemLayout}>
        <Flex gap="small">
            <Button type="primary" htmlType="submit">
                登录
            </Button>
            <LogoutButton />
            或者 <a href="/userRegister">尚未注册？去注册</a>
        </Flex>
        </Form.Item>
    </Form>
    </div>
);
};

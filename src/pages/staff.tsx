// page @ /staff

import {
  Button,
  Flex,
  Table,
  TableColumnsType,
  Modal,
  Form,
  FormProps,
  Input,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import { StaffOracleAbstract } from "../data/interface/network";
import TextArea from "antd/es/input/TextArea";
import { QuestionCircleOutlined } from "@ant-design/icons";
type FieldType = {
  refund: number;
  content: string;
};
export const StaffOraclePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish: FormProps<FieldType>["onFinish"] = () => {
    alert("已提交回复！");
  };
  const columns: TableColumnsType<StaffOracleAbstract> = [
    { title: "ID", dataIndex: "id" },
    { title: "是否回复", dataIndex: "active" },
    { title: "花费", dataIndex: "cost" },
    { title: "题目", dataIndex: "puzzle" },
    { title: "队伍", dataIndex: "team" },
    { title: "退费", dataIndex: "refund" },
    {
      title: "操作",
      dataIndex: "",
      key: "x",
      render: (_) => (
        <Button onClick={showModal} type="primary">
          点击回复
        </Button>
      ),
    },
  ];

  const datasource = Array.from({ length: 100 }).map<StaffOracleAbstract>(
    (_, i) => ({
      key: i,
      id: i,
      active: false,
      cost: i * 100,
      puzzle: 5,
      team: i * 3 + 1,
      refund: 0,
    }),
  );
  return (
    <div>
      注：这个页面只是一个样子货，尚未接入API。
      <Flex align="center" gap="middle">
        <Table<StaffOracleAbstract> columns={columns} dataSource={datasource} />
        <Modal
          title="回复神谕……"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          destroyOnClose
        >
          <div>
            <Form
              form={form}
              name="oracle"
              className="oracle-reply"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="退费款项"
                name="refund"
                rules={[
                  {
                    required: true,
                    message: "退费不能为空!",
                  },
                ]}
              >
                <Input type="number" placeholder="请输入退费款项（可负）" />
              </Form.Item>
              <Form.Item
                label="回复内容"
                name="content"
                rules={[
                  {
                    required: true,
                    message: "回复内容不能为空!",
                  },
                ]}
              >
                <TextArea
                  showCount
                  maxLength={200}
                  placeholder="请输入回复内容..."
                  style={{ height: 120, resize: "none" }}
                />
              </Form.Item>
              <Form.Item>
                <Flex gap="medium">
                  <Button type="primary" htmlType="submit">
                    回复神谕
                  </Button>
                  &nbsp;&nbsp;
                  <Tooltip title="此处有不同的按钮。下方的按钮为关闭窗口用，点击后不会保存已经输入的内容。">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </Flex>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </Flex>
    </div>
  );
};

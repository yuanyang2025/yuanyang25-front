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
  message,
} from "antd";
import React, { useState } from "react";
import {
  StaffListOracleResp,
  StaffOracleAbstract,
} from "../data/interface/network";
import TextArea from "antd/es/input/TextArea";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { isOk, request } from "../utils/network";
type FieldTypeReply = {
  refund: number;
  content: string;
};
type FieldTypeInfo = {
  start_id: number;
  limit: number;
};
export const StaffOraclePage: React.FC = () => {
  const [isModalReplyOpen, setIsModalReplyOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oracleLimit, setOracleLimit] = useState(0);
  const [oracleStartId, setOracleStartId] = useState(0);
  const [oracleList, setOracleList] = useState<any[]>([]);
  const [form] = Form.useForm();
  const showModalReply = () => {
    form.resetFields();
    setIsModalReplyOpen(true);
  };
  const showModalDetail = () => {
    setIsModalDetailOpen(true);
  };
  const handleOk = () => {
    setIsModalReplyOpen(false);
    setIsModalDetailOpen(false);
  };

  const handleCancel = () => {
    setIsModalReplyOpen(false);
    setIsModalDetailOpen(false);
  };
  const onFinish: FormProps<FieldTypeReply>["onFinish"] = () => {
    message.success("已提交回复！");
  };
  const onQuery: FormProps<FieldTypeInfo>["onFinish"] = async (values) => {
    setLoading(true);
    let start_id = values.start_id;
    let limit = values.limit;
    const query = await request<StaffListOracleResp>(
      `/api/staff_list_oracle?start_oracle_id=${start_id}&limit=${limit}`,
      "GET",
    );
    if (!isOk(query)) {
      message.error("请求失败！" + query.data);
      setLoading(false);
    } else {
      setOracleStartId(start_id);
      setOracleLimit(limit);
      console.log(query.data);
      setOracleList(query.data.oracles);
      setLoading(false);
      message.success("请求成功！");
    }
  };
  const columns: TableColumnsType<StaffOracleAbstract> = [
    { title: "ID", dataIndex: "id" },
    {
      title: "是否回复",
      dataIndex: "active",
      render: (text) => {
        if (text.value == false) {
          return "是";
        } else {
          return "否";
        }
      },
    },
    { title: "花费", dataIndex: "cost" },
    { title: "题目", dataIndex: "puzzle" },
    { title: "队伍", dataIndex: "team" },
    { title: "退费", dataIndex: "refund" },
    {
      title: "操作",
      dataIndex: "",
      key: "",
      render: () => (
        <div>
          <Button onClick={showModalReply} type="primary">
            点击回复
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={showModalDetail} type="primary">
            查看详情
          </Button>
        </div>
      ),
    },
  ];

  /*const datasource = Array.from({ length: oracleLimit }).map<StaffOracleAbstract>(
    (_, i) => ({
      key: i,
      id: i,
      active: false,
      cost: i * 100,
      puzzle: 5,
      team: i * 3 + 1,
      refund: 0,
    }),
  );*/
  return (
    <div>
      注：这个页面只是一个样子货，尚未接入API。（onFinish函数、查询详情）
      <Flex align="start" gap="middle" vertical>
        <Form
          layout="inline"
          name="Oracle-info"
          onFinish={onQuery}
          autoComplete="off"
        >
          <Form.Item
            label="起始神谕ID"
            name="start_id"
            rules={[
              {
                required: true,
                message: "起始ID不能为空!",
              },
            ]}
          >
            <Input placeholder="起始ID" type="number" />
          </Form.Item>
          <Form.Item
            label="查询数量"
            name="limit"
            rules={[
              {
                required: true,
                message: "查询数量不能为空!",
              },
            ]}
          >
            <Input placeholder="查询数量" type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
        <Table<StaffOracleAbstract>
          columns={columns}
          dataSource={oracleList}
          loading={loading}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            total: oracleList.length,
          }}
          rowKey={(oracleList) => oracleList.id}
        />
        <Modal
          title="回复神谕……"
          open={isModalReplyOpen}
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
              <Form.Item<FieldTypeReply>
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
              <Form.Item<FieldTypeReply>
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
        <Modal
          title="详情"
          open={isModalDetailOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          destroyOnClose
        >
          <div>详情内容（TBD）</div>
        </Modal>
      </Flex>
    </div>
  );
};

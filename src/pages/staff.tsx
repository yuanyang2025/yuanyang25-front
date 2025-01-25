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
  message,
} from "antd";
import React, { useState } from "react";
import {
  GetOracleResp,
  StaffListOracleResp,
  StaffOracleAbstract,
  StaffReplyOracleReq,
} from "../data/interface/network";
import TextArea from "antd/es/input/TextArea";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { isOk, request } from "../utils/network";
import { PuzzleTitle } from "../data/constants";

type FieldTypeReply = {
  charge: number;
  content: string;
};

type FieldTypeInfo = {
  start_id: number;
};

const PageSize = 10;

export const StaffOraclePage: React.FC = () => {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oracleStartId, setOracleStartId] = useState(0);

  const [oracleList, setOracleList] = useState<StaffOracleAbstract[]>([]);
  const [currentOracle, setCurrentOracle] = useState<undefined | GetOracleResp>(
    undefined,
  );
  const [form] = Form.useForm();

  const showModalDetail = async (id: number) => {
    const query = await request<GetOracleResp>(
      `/api/get_oracle?oracle_id=${id}`,
      "GET",
    );
    if (!isOk(query)) {
      message.error(`获取神谕${id}详细信息失败！` + query.data);
      setIsModalDetailOpen(false);
      return;
    }
    setCurrentOracle(query.data);
    form.resetFields();
    setIsModalDetailOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalDetailOpen(false);
  };

  const onFinish: FormProps<FieldTypeReply>["onFinish"] = async (form_data) => {
    if (currentOracle == undefined) {
      setIsModalDetailOpen(false);
      return;
    }

    const data: StaffReplyOracleReq = {
      oracle_id: currentOracle.id,
      refund_amount: currentOracle.cost - form_data.charge,
      content: form_data.content,
    };
    const query = await request<string>(
      `/api/staff_reply_oracle`,
      "POST",
      data,
    );

    if (isOk(query)) {
      message.success("成功提交回复！");
      setIsModalDetailOpen(false);
    } else {
      message.error("提交回复失败！" + query.data);
    }

    onChangeStart(oracleStartId);
  };

  const onChangeStart = async (start_id: number) => {
    setLoading(true);
    let limit = PageSize;
    const query = await request<StaffListOracleResp>(
      `/api/staff_list_oracle?start_oracle_id=${start_id}&limit=${limit}`,
      "GET",
    );
    if (!isOk(query)) {
      message.error("查询神谕列表失败！" + query.data);
      setLoading(false);
    } else {
      setOracleStartId(start_id);
      setOracleList(query.data.oracles);
      setLoading(false);
      message.success("查询神谕列表成功！");
    }
  };

  const onQuery: FormProps<FieldTypeInfo>["onFinish"] = async (values) => {
    onChangeStart(+values.start_id);
  };

  const columns: TableColumnsType<StaffOracleAbstract> = [
    { title: "ID", dataIndex: "id" },
    {
      title: "等待回复",
      dataIndex: "active",
      render: (active) => {
        return active ? "是" : "否";
      },
    },
    { title: "押金", dataIndex: "cost" },
    { title: "退费", dataIndex: "refund" },
    {
      title: "收费",
      dataIndex: "",
      key: "charge",
      render: (data: StaffOracleAbstract) => {
        return data.active ? "" : data.cost - data.refund;
      },
    },
    {
      title: "题目",
      dataIndex: "puzzle",
      render: (id: number) => id + " " + PuzzleTitle.get(id),
    },
    { title: "队伍", dataIndex: "team" },
    {
      title: "操作",
      dataIndex: "",
      key: "operation",
      render: (data: StaffOracleAbstract) => {
        return (
          <div>
            <Button
              onClick={() => {
                showModalDetail(data.id);
              }}
              type={data.active ? "primary" : "dashed"}
            >
              {data.active ? "回复" : "查看"}
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
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
            <Input placeholder="起始ID" type="number" value={oracleStartId} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>

        <div style={{ fontSize: "20px", color: "#08c" }}>
          <LeftCircleOutlined
            onClick={() => {
              onChangeStart(Math.max(oracleStartId - PageSize, 0));
            }}
          />
          &nbsp;&nbsp;
          <span style={{ color: "#000" }}>
            {oracleList.length > 0
              ? `当前查询范围： [${oracleStartId},${oracleStartId + PageSize})`
              : `无查询`}
          </span>
          &nbsp;&nbsp;
          <RightCircleOutlined
            style={{ fontSize: "24px", color: "#08c" }}
            onClick={() => {
              onChangeStart(Math.max(oracleStartId + PageSize, 0));
            }}
          />
        </div>

        <Table<StaffOracleAbstract>
          columns={columns}
          dataSource={oracleList}
          loading={loading}
          pagination={false}
          rowKey={(oracleList) => oracleList.id}
        />

        <Modal
          title={`神谕请求 ${currentOracle?.id} : 关于 ${currentOracle?.puzzle} ${currentOracle?.puzzle === undefined ? "" : PuzzleTitle.get(currentOracle.puzzle)}`}
          open={isModalDetailOpen}
          footer={null}
          closable={false}
          width={1000}
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
              <Form.Item label="提问内容">
                <TextArea
                  disabled={true}
                  style={{ height: 120, resize: "none" }}
                  value={currentOracle?.query}
                />
              </Form.Item>

              <Form.Item<FieldTypeReply>
                label="收费"
                name="charge"
                rules={[
                  {
                    required: true,
                    message: "收费不能为空!",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder={
                    currentOracle?.active
                      ? `请输入收费。押金为${currentOracle?.cost}。`
                      : (
                          (currentOracle?.cost as number) -
                          (currentOracle?.refund as number)
                        ).toString()
                  }
                  disabled={currentOracle?.active !== true}
                />
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
                  placeholder={
                    currentOracle?.active
                      ? "请输入回复内容..."
                      : currentOracle?.response
                  }
                  style={{ height: 120, resize: "none" }}
                  disabled={currentOracle?.active !== true}
                />
              </Form.Item>
              <Form.Item>
                <Flex gap="medium">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={currentOracle?.active !== true}
                  >
                    回复神谕
                  </Button>
                  &nbsp;&nbsp;
                  <Button type="default" onClick={handleCloseModal}>
                    取消
                  </Button>
                </Flex>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </Flex>
    </div>
  );
};

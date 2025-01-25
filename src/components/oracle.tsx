import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  message,
  Modal,
  notification,
  Popconfirm,
  Table,
  TableColumnsType,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { isOk, request } from "../utils/network";
import {
  CheckOracleResp,
  CreateOracleResp,
  GetOracleResp,
} from "../data/interface/network";
import { PuzzleTitle } from "../data/constants";

export interface OracleProp {
  puzzleId: number;
}

type FieldTypeCreate = {
  puzzle_id: OracleProp;
  content: string;
};

type TableTypeActive = {
  id: number;
  active: boolean;
};

export const Oracle = (props: OracleProp) => {
  // const isMobile = window.innerWidth < 768;
  const puzzleId = props.puzzleId;
  const [form] = Form.useForm();
  const [isOracleCreateOpen, setIsOracleCreateOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [oracleList, setOracleList] = useState<TableTypeActive[]>([]);
  const [currentOracle, setCurrentOracle] = useState<undefined | GetOracleResp>(
    undefined,
  );
  const handleCreate = () => {
    form.resetFields()
    setIsOracleCreateOpen(true);
  };
  const handleCancel = () => {
    form.resetFields()
    setIsOracleCreateOpen(false);
  };
  const handleConfirmCancle = () => {
    setOpen(false);
    setConfirm(false);
  };
  const handleConfirm = () => {
    setOpen(false);
    setConfirm(true);
    message.success("已确认！请再次点击“提交”。");
  };
  const handleCloseModal = () => {
    setIsModalDetailOpen(false);
  };
  const onCreate: FormProps<FieldTypeCreate>["onFinish"] = async (values) => {
    form.resetFields()
    setConfirm(false);
    if (confirm === true) {
      let puzzle_id = puzzleId;
      const resp = await request<CreateOracleResp>(
        `/api/create_oracle`,
        "POST",
        {
          puzzle_id: puzzle_id,
          content: values.content,
        },
      );
      if (!isOk(resp)) {
        message.error("提交神谕失败！" + resp.data);
        return;
      } else if (resp.data == "TooManyActiveOracle") {
        console.error(resp.data);
        message.error("提交失败！您有太多未回复的神谕请求。请等待staff回复。");
      } else {
        console.log(resp.data);
        notification.open({
          message: "提交成功！",
          description: `花费点数${Math.abs(resp.data.Sucess.cost)}，当前点数${resp.data.Sucess.new_balance}
                    请等待staff回复您的提问！`,
          type: "success",
          showProgress: true,
          pauseOnHover: true,
        });
      }
      //console.log(values)
      //console.log(puzzle_id)
      setIsOracleCreateOpen(false);
      onChange(puzzle_id);
    } else {
      setOpen(true);
      //console.log(confirm)
      // setIsOracleCreateOpen(false)
    }
  };
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

  const onChange = async (puzzle_id: number) => {
    setLoading(true);
    const query = await request<CheckOracleResp>(
      `/api/check_oracle?puzzle_id=${puzzle_id}`,
      "GET",
    );
    if (!isOk(query)) {
      message.error("查询神谕列表失败！" + query.data);
      setLoading(false);
    } else {
      let active = query.data.active;
      let inactive = query.data.inactive;
      let new_array: any[] = [];
      for (let i = 0; i < active.length; i++) {
        new_array.push({ id: active[i], active: true });
      }
      for (let i = 0; i < inactive.length; i++) {
        new_array.push({ id: inactive[i], active: false });
      }
      // setOracleStartId(start_id);
      setOracleList(new_array);
      console.log(oracleList);
      setLoading(false);
      message.success("查询神谕列表成功！");
    }
  };

  const columns: TableColumnsType<TableTypeActive> = [
    { title: "ID", dataIndex: "id" },
    {
      title: "等待回复",
      dataIndex: "active",
      render: (active) => {
        return active ? "是" : "否";
      },
    },
    {
      title: "操作",
      dataIndex: "",
      key: "operation",
      render: (data: TableTypeActive) => {
        return (
          <div>
            <Button
              onClick={() => {
                showModalDetail(data.id);
              }}
              type={data.active ? "primary" : "dashed"}
            >
              {data.active ? "查看" : "查看回复"}
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Flex align="start" gap="middle" vertical>
        <Modal open={isOracleCreateOpen} onCancel={handleCancel}>
          <div>
            <Form
              name="createOracle"
              layout="vertical"
              onFinish={onCreate}
              autoComplete="off"
            >
              <Form.Item
                label="提问："
                name="content"
                rules={[
                  {
                    required: true,
                    message: "提问不能为空!",
                  },
                ]}
              >
                <TextArea
                  placeholder="输入提问内容"
                  showCount
                  maxLength={200}
                />
              </Form.Item>
              <Form.Item>
                <Popconfirm
                  title="确认请求"
                  description={`确认花费8888点提交请求吗？`}
                  okText="确认"
                  cancelText="再想想"
                  open={open}
                  onConfirm={handleConfirm}
                  onCancel={handleConfirmCancle}
                >
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Popconfirm>
              </Form.Item>
            </Form>
          </div>
        </Modal>
        <Flex align="start" gap="middle">
          <Button type="primary" onClick={handleCreate}>
            请求神谕
          </Button>
          <Button type="primary" onClick={() => onChange(puzzleId)}>
            查询神谕
          </Button>
        </Flex>
        <Table
          columns={columns}
          dataSource={oracleList}
          loading={loading}
          rowKey={(oracleList) => oracleList.id}
        />
        <Modal
          title={`神谕请求 ${currentOracle?.id} : 关于 ${currentOracle?.puzzle} ${currentOracle?.puzzle === undefined ? "" : PuzzleTitle.get(currentOracle.puzzle)}`}
          open={isModalDetailOpen}
          onClose={handleCloseModal}
          onCancel={handleCloseModal}
          footer={null}
          width={1000}
          destroyOnClose
        >
          <div>
            <Form form={form} name="getOracle" layout="vertical">
              <Form.Item label="提问内容：">
                <TextArea
                  disabled={true}
                  style={{ height: 120, resize: "none" }}
                  value={currentOracle?.query}
                />
              </Form.Item>
              <Form.Item label="押金：">
                <Input
                  disabled={true}
                  value={currentOracle?.cost}
                  variant="borderless"
                />
              </Form.Item>
              <Form.Item label="退费：">
                <Input
                  disabled={true}
                  value={
                    currentOracle?.active
                      ? "staff尚未处理退费"
                      : currentOracle?.refund
                  }
                  variant="borderless"
                />
              </Form.Item>
              <Form.Item label="实际花费：">
                <Input
                  disabled={true}
                  value={
                    currentOracle?.active
                      ? "staff尚未处理"
                      : String(
                          (currentOracle?.cost as number) -
                            (currentOracle?.refund as number),
                        )
                  }
                  variant="borderless"
                />
              </Form.Item>
              <Form.Item label="回答内容：">
                <TextArea
                  disabled={true}
                  value={
                    currentOracle?.active
                      ? "staff尚未回答"
                      : currentOracle?.response
                  }
                  style={{ height: 120, resize: "none" }}
                />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </Flex>
    </div>
  );
};

// puzzle list component

import "./puzzleList.css";
import { Button, Menu, message } from "antd";
import {
  RightOutlined,
  LeftOutlined,
  DownOutlined,
  MenuOutlined,
  StarTwoTone,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { PuzzleData } from "../data/constants";
import { PuzzleDetail, PuzzleStatus } from "../data/interface/puzzle";
import { GetListResp, TimeStamp } from "../data/interface/network";
import { isOk, request } from "../utils/network";

export interface PuzzleListProp {
  puzzleId: number;
  setPuzzleId: (id: number) => void;
}

export const PuzzleList = (props: PuzzleListProp) => {
  const isMobile = window.innerWidth < 768;
  const active_id = props.puzzleId;
  const setActive = props.setPuzzleId;
  const [collapsed, setCollapsed] = useState(isMobile);
  const [status, setStatus] = useState<PuzzleStatus[]>([]);
  const [updated, setUpdated] = useState<TimeStamp>();

  const getMenuItem = (data: PuzzleDetail) => {
    const st = status.find((st) => st.puzzle_id === data.puzzle_id);
    return {
      key: `puzzle-${data.puzzle_id}`,
      className: "puzzle-item",
      onClick: () => setActive(data.puzzle_id),
      icon: <StarTwoTone />,
      label: (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              overflowX: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {data.title}
          </div>
          {st && (
            <div
              style={{ alignSelf: "right", marginLeft: "10px", opacity: "0.5" }}
            >
              {`${st.passed - 1}/${st.unlocked - 1}`}
            </div>
          )}
        </div>
      ),
    };
  };
  let puzzleList1 = PuzzleData.filter((data) => !data.meta).map(getMenuItem);
  let puzzleList2 = PuzzleData.filter((data) => data.meta).map(getMenuItem);
  const getStatus = async () => {
    const resp = await request<GetListResp>(`/api/puzzle_status`, "GET");
    if (!isOk(resp)) {
      console.error("status", resp.data);
      message.error("错误！" + String(resp.data));
    } else {
      setUpdated(resp.data.updated);
      setStatus(resp.data.data);
    }
  };
  useEffect(() => {
    getStatus();
  }, [setStatus]);

  return (
    <div
      style={{
        width: !collapsed && !isMobile ? "25%" : undefined,
        marginRight: "20px",
        position: isMobile ? "fixed" : "sticky",
        top: "84px",
        zIndex: 99,
        right: isMobile ? 0 : undefined,
      }}
    >
      <Button
        type="default"
        className="fold"
        onClick={() => setCollapsed((x) => !x)}
      >
        {collapsed ? (
          isMobile ? (
            <MenuOutlined />
          ) : (
            <RightOutlined />
          )
        ) : isMobile ? (
          <DownOutlined />
        ) : (
          <LeftOutlined />
        )}
      </Button>
      {puzzleList1.length !== 0 && (!isMobile || !collapsed) && (
        <Menu
          className="puzzle-menu"
          // defaultSelectedKeys={[`puzzle-${active_id}`]}
          selectedKeys={[`puzzle-${active_id}`]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed || isMobile}
          items={puzzleList1}
        >
          {/* {puzzleList1} */}
        </Menu>
      )}
      <div style={{ height: "10px" }} />
      {puzzleList2.length !== 0 && (!isMobile || !collapsed) && (
        <Menu
          className="puzzle-menu"
          // defaultSelectedKeys={[`puzzle-${active_id}`]}
          selectedKeys={[`puzzle-${active_id}`]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed || isMobile}
          items={puzzleList2}
        >
          {/* {puzzleList2} */}
        </Menu>
      )}
      {/* <div className="mask" style={{ display: isMobile && !collapsed ? 'block' : 'none' }}></div> */}
      {!isMobile && updated && !collapsed && (
        <div
          style={{
            marginTop: "10px",
            color: "rgba(1, 1, 1, 0.3)",
            fontSize: "small",
          }}
        >
          {`更新于 ${new Date(updated * 1000).toLocaleString()}`}
        </div>
      )}
    </div>
  );
};

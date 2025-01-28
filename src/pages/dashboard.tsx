// page @ /dashboard

import { useRef, useState } from "react";
import { PuzzleList } from "../components/puzzleList";
import { PuzzleData } from "../data/constants";
import { PuzzleDetail } from "../components/puzzleDetail";
import { KeyData } from "../data/interface/puzzle";

function storePuzzle(puzzle: number): void {
  localStorage.setItem("puzzle", puzzle.toString());
}

function getPuzzle(or_default: number): number {
  const puzzle = localStorage.getItem("puzzle");
  return puzzle ? parseInt(puzzle, 10) : or_default;
}

export const DashboardPage = () => {
  const [puzzleId, _setPuzzleId] = useState<number>(
    getPuzzle(PuzzleData[0].puzzle_id),
  );

  const setPuzzleId = (newPuzzleId: number) => {
    _setPuzzleId(newPuzzleId); // 更新状态
    storePuzzle(newPuzzleId); // 同步存储到 localStorage, 使页面刷新后打开的tab不变！
  };

  const keys = useRef<Map<number, KeyData>>(new Map());

  const setKeys = (
    dec_id: number,
    new_key: string | undefined,
    new_price: number | undefined,
  ) => {
    const currentKeyData = keys.current.get(dec_id);
    // 只更新有值的字段
    if (currentKeyData) {
      keys.current.set(dec_id, {
        key: new_key !== undefined ? new_key : currentKeyData.key,
        dec_id,
        price: new_price !== undefined ? new_price : currentKeyData.price,
      });
    } else {
      // 如果该 dec_id 不存在，直接设置新值
      keys.current.set(dec_id, {
        key: new_key,
        dec_id,
        price: new_price,
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyItems: "space-between",
      }}
    >
      <PuzzleList puzzleId={puzzleId} setPuzzleId={setPuzzleId} />
      <PuzzleDetail puzzleId={puzzleId} keys={keys.current} setKeys={setKeys} />
    </div>
  );
};

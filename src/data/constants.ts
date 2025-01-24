// fixed puzzle data

import { PuzzleDetail } from "./interface/puzzle";
import jsonData from "./frontend.json";

export const PuzzleData: PuzzleDetail[] = jsonData;

function findMaxDecipherId(data: any) {
  let maxDecipherId = -Infinity; // 初始值设为负无穷大

  function traverse(obj: any) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => traverse(item));
    } else if (obj && typeof obj === "object") {
      for (const key in obj) {
        if (key === "decipher_id" && typeof obj[key] === "number") {
          maxDecipherId = Math.max(maxDecipherId, obj[key]);
        } else {
          traverse(obj[key]);
        }
      }
    }
  }

  traverse(data);
  return maxDecipherId === -Infinity ? 100 : maxDecipherId; // 如果没有找到数字值，返回 null
}

export const MaxDecID = 1 + findMaxDecipherId(PuzzleData);

export const PuzzleTitle: Map<number, string> = PuzzleData.reduce(
  (map, puzzle) => {
    map.set(puzzle.puzzle_id, puzzle.title);
    return map;
  },
  new Map<number, string>(),
);

console.info("MaxDecID", MaxDecID);

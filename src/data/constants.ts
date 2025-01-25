// fixed puzzle data

import { PuzzleDetail } from "./interface/puzzle";
import jsonData from "./frontend.json";

export const PuzzleData: PuzzleDetail[] = jsonData;

export const PuzzleTitle: Map<number, string> = PuzzleData.reduce(
  (map, puzzle) => {
    map.set(puzzle.puzzle_id, puzzle.title);
    return map;
  },
  new Map<number, string>(),
);

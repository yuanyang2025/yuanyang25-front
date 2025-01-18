// page @ /dashboard

import { useRef, useState } from "react";
import { PuzzleList } from "../components/puzzleList";
import { MaxDecID, PuzzleData } from "../data/constants";
import { PuzzleDetail } from "../components/puzzleDetail";
import { KeyData } from "../data/interface/puzzle";

export const DashboardPage = () => {
    const [puzzleId, setPuzzleId] = useState<number>(PuzzleData[0].puzzle_id);

    const keys = useRef<KeyData[]>(Array.from({ length: MaxDecID }, (_, j) => { return { key: undefined, dec_id: j, price: undefined } }));
    const setKeys = (dec_id: number, new_key: string | undefined, new_price: number | undefined) => {
        keys.current = keys.current.map((data) => {
            return data.dec_id === dec_id ? { key: new_key, dec_id: dec_id, price: new_price } : data
        });
    };

    return <div style={{ display: 'flex', flexDirection: 'row', justifyItems: 'space-between' }}>
        <PuzzleList puzzleId={puzzleId} setPuzzleId={setPuzzleId} />
        <PuzzleDetail puzzleId={puzzleId} keys={keys.current} setKeys={setKeys} />
    </div>;
};

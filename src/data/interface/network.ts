import { PuzzleStatus } from "./puzzle";

export type OkResp<T> = {
    status: 200 | 201 | 202 | 203 | 204;
    data: T;
}

export type ErrResp = {
    status: Exclude<number, 200>;
    data: {
        msg?: string;
    } | string;
}

export type Resp<T> = ErrResp | OkResp<T>;

export type TimeStamp = number;

export interface GetDecKeyResp {
    Success?: string;
    Part?: string;
    Full?: string;
    Price?: number;
};

export interface PostUnlockResp {
    AlreadyUnlocked?: string;
    Success?: {
        key: string;
        price: number;
        new_balance: number;
    };
};

export interface PostSubmitReq {
    puzzle_id: number;
    answer: string;
};

export interface PostSubmitResp {
    WrongAnswer?: {
        penalty_token: number,
        try_again_after: TimeStamp,
        new_balance: number,
    };
    TryAgainAfter?: TimeStamp;
    HasSubmitted?: any;
    Success?: {
        puzzle_id: number,
        award_token: number,
        new_balance: number,
        key: string;
        finish: boolean;
    };
    PleaseToast: string;
};

export interface GetListResp {
    updated: TimeStamp;
    data: PuzzleStatus[];
};

export interface GetInfoResp {
    user_id: number;
    privilege: number;
    team_id: number | null;
    token_balance: number | null;
};

import { PuzzleStatus } from "./puzzle";

export type OkResp<T> = {
  status: 200 | 201 | 202 | 203 | 204;
  data: T;
};

export type ErrResp = {
  status: Exclude<number, 200>;
  data:
    | {
        msg?: string;
      }
    | string;
};

export type Resp<T> = ErrResp | OkResp<T>;

export type TimeStamp = number;

export interface GetDecKeyResp {
  Success?: string;
  Part?: string;
  Full?: string;
  Price?: number;
}

export interface PostUnlockResp {
  AlreadyUnlocked?: string;
  Success?: {
    key: string;
    price: number;
    new_balance: number;
  };
}

export interface PostSubmitReq {
  puzzle_id: number;
  answer: string;
}

export interface PostSubmitResp {
  WrongAnswer?: {
    penalty_token: number;
    try_again_after: TimeStamp;
    new_balance: number;
  };
  TryAgainAfter?: TimeStamp;
  HasSubmitted?: any;
  Success?: {
    puzzle_id: number;
    award_token: number;
    new_balance: number;
    key: string;
    finish: boolean;
  };
  PleaseToast: string;
}

export interface GetListResp {
  updated: TimeStamp;
  data: PuzzleStatus[];
}

export interface GetInfoResp {
  user_id: number;
  privilege: number;
  team_id: number | null;
  token_balance: number | null;
}

export interface RegisterReq {
  username: string;
  token: string;
  password: string;
}

export interface RegisterResp {
  Success?: number;
  Failed?: string;
}

export interface LoginReq {
  user_id: number;
  auth: {
    method: string;
    data: string;
  };
}

//If Success is not found, then failed
export interface LoginResp {
  Success: number;
}

export interface CreateTeamResp {
  Success?: {id: number},
  AlreadyInTeam?: {id: number},
}

export type TeamTOTPResp = { Success: { id: number; totp: string } };

export interface JoinTeamReq {
  team_id: number
  vericode: string
}

export type JoinTeamResp = {
  Success: { id: number }
}
export type ExitTeamResp = {
  Success: { id: number }
}

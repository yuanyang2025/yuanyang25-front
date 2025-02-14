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
  HasSubmitted?: string;
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
  Success?: { id: number };
  AlreadyInTeam?: { id: number };
}

export type TeamTOTPResp = { Success: { id: number; totp: string } };

export interface JoinTeamReq {
  team_id: number;
  vericode: string;
}

export type JoinTeamResp =
  | {
      Success: { id: number };
    }
  | "AlreadyInTeam"
  | "TeamFull"
  | "AuthError";

export type ExitTeamResp =
  | {
      Success: { id: number };
    }
  | "NotAllowed"
  | "NotInTeam";

// Oracle
export interface CreateOracleReq {
  puzzle_id: number;
  content: string;
}

export interface WorkFromResp {
  Start?: number;
  Nothing?: string;
}

export type CreateOracleResp =
  | {
      Sucess: {
        oracle_id: number;
        cost: number;
        new_balance: number;
      };
    }
  | "TooManyActiveOracle";

export interface CheckOracleResp {
  active: number[];
  inactive: number[];
}

export interface GetOracleResp {
  id: number;
  puzzle: number;
  team: number;
  active: boolean;
  cost: number;
  refund: number;
  query: string;
  response: string;
}

export interface StaffReplyOracleReq {
  oracle_id: number;
  refund_amount: number;
  content: string;
}

export interface StaffOracleAbstract {
  id: number;
  active: boolean;
  cost: number;
  refund: number;
  team: number;
  puzzle: number;
}

export interface StaffListOracleResp {
  oracles: StaffOracleAbstract[];
  //oracles: string[]
}

export type RankResp =
  | {
      Success: { rank_record: number; time: TimeStamp };
    }
  | "NotFound";

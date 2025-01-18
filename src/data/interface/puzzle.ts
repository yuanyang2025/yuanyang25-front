// puzzle data interface

export interface Cipher {
    decipher_id: number;
    cipher: string[];
};

export interface Hint {
    title: string;
    cipher: Cipher;
};

export interface PuzzleDetail {
    puzzle_id: number;
    title: string;
    meta: boolean;
    skip: Cipher;
    content: Cipher;
    hints: Hint[];
};

export interface PuzzleStatus {
    passed: number;
    unlocked: number;
    puzzle_id: number;
};

export interface KeyData {
    key: string | undefined;
    dec_id: number;
    price: number | undefined;
};
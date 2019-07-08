export interface Life {
    readonly hp: number;
    readonly maxHp: number;
}

const Minimal: Life = {hp: 0, maxHp: 0};
const Full: Life = {hp: 100, maxHp: 100};

export const Life = Object.freeze({Minimal, Full});

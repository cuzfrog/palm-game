export interface CoreGameState {
    readonly hp: number;
    readonly maxHp: number;
}

export const DefaultCoreGameState: CoreGameState = {
    hp: 0,
    maxHp: 1,
};

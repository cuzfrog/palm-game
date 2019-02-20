import {Life} from '../../domain';

export interface CoreGameState {
    readonly life: Life;
    readonly enemyLife: Life;
}

export const DefaultCoreGameState: CoreGameState = {
    life: {
        hp: 0,
        maxHp: 1,
    },
    enemyLife: {
        hp: 0,
        maxHp: 1,
    }
};

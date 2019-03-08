import {CoreActions, coreReducer, DefaultSystemState} from '../../../src/store';
import {Specs} from '../../../src/Specs';
import {GameType, SystemStatus} from '../../../src/domain';

const prevState = DefaultSystemState;

describe('system reducer', () => {
    it('add score to current game', () => {
        const state = coreReducer(prevState, CoreActions.addScore(500));
        expect(state.scores.get(state.gameType)).toEqual(prevState.scores.get(state.gameType) as number + 500);
    });

    it('increase level', () => {
        const stateLevel1 = {...prevState, level: 1};
        expect(coreReducer(stateLevel1, CoreActions.increaseLevel()).level).toBe(2);

        const stateLevelMax = {...prevState, level: Specs.maxLevel};
        expect(coreReducer(stateLevelMax, CoreActions.increaseLevel()).level).toBe(1);
    });

    it('decrease level', () => {
        const stateLevel1 = {...prevState, level: 1};
        expect(coreReducer(stateLevel1, CoreActions.decreaseLevel()).level).toBe(Specs.maxLevel);

        const stateLevel3 = {...prevState, level: 3};
        expect(coreReducer(stateLevel3, CoreActions.decreaseLevel()).level).toBe(2);
    });

    const stateNotInGame = {...prevState, status: SystemStatus.MENU};
    const stateInGame = {...prevState, status: SystemStatus.IN_GAME};

    it('no pausing game if not in game', () => {
        expect(() => coreReducer(stateNotInGame, CoreActions.togglePause())).toThrow();
    });

    it('pause game if in game', () => {
        expect(coreReducer(stateInGame, CoreActions.togglePause()).inGamePaused).toBeTruthy();
    });

    it('enter game if not in game', () => {
        expect(coreReducer(stateNotInGame, CoreActions.enterGame()).status).toEqual(SystemStatus.IN_GAME);
    });

    it('no entering game if already in game', () => {
        expect(() => coreReducer(stateInGame, CoreActions.enterGame())).toThrow();
    });

    it('exit game if in game', () => {
        expect(coreReducer(stateInGame, CoreActions.exitGame()).status).not.toBe(SystemStatus.IN_GAME);
    });

    it('no exiting game if not in game', () => {
        expect(() => coreReducer(stateNotInGame, CoreActions.exitGame())).toThrow();
    });

    it('toggle to next game', () => {
        const keys = Object.keys(GameType);
        for (let i = 0; i < keys.length; i++) {
            const stateGameTypeN = {...prevState, status: SystemStatus.MENU, gameType: GameType[keys[i]]};
            const nextGame = GameType[keys[i >= keys.length - 1 ? 0 : i + 1]];
            expect(coreReducer(stateGameTypeN, CoreActions.toggleGame()).gameType).toEqual(nextGame);
        }
    });

    it('cannot toggle game if not in game', () => {
        expect(() => coreReducer(stateInGame, CoreActions.toggleGame())).toThrow();
    });
});

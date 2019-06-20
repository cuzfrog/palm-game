import {Lens} from 'monocle-ts';
import {Map} from 'immutable';
import {GameType, SystemStatus} from '../../../src/domain';

import {CoreActions, coreReducer, CoreState, DefaultCoreState} from '../../../src/store';
import {Specs} from '../../../src/Specs';

const prevState = DefaultCoreState;

const scoreLens = Lens.fromPath<CoreState>()(['scores']);

describe('system reducer', () => {
    it('add score to current game', () => {
        const stateWithScore = scoreLens.set(Map())(prevState);
        const state = coreReducer(stateWithScore, CoreActions.addScore(500));
        expect(state.scores.get(state.gameType)).toEqual(500);
    });

    it('increase level', () => {
        const stateLevel1 = {...prevState, level: Map([[prevState.gameType, 1]])};
        expect(coreReducer(stateLevel1, CoreActions.increaseLevel()).getLevel()).toBe(2);

        const stateLevelMax = {...prevState, level: Map([[prevState.gameType, Specs.core.maxLevel]])};
        expect(coreReducer(stateLevelMax, CoreActions.increaseLevel()).getLevel()).toBe(1);
    });

    it('decrease level', () => {
        const stateLevel1 = {...prevState, level: Map([[prevState.gameType, 1]])};
        expect(coreReducer(stateLevel1, CoreActions.decreaseLevel()).getLevel()).toBe(Specs.core.maxLevel);

        const stateLevel3 = {...prevState, level: Map([[prevState.gameType, 3]])};
        expect(coreReducer(stateLevel3, CoreActions.decreaseLevel()).getLevel()).toBe(2);
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

    it('exit game and save scores to maxScores', () => {
        const scores = Map([[GameType.BOXER, 5000], [GameType.SNAKE, 300]]);
        const maxScores = Map([[GameType.BOXER, 3000], [GameType.SNAKE, 1000]]);
        const s1 = {...stateInGame, scores, maxScores};
        const s2 = coreReducer(s1, CoreActions.exitGame());
        expect(s2.status).not.toBe(SystemStatus.IN_GAME);
        expect(s2.maxScores.get(GameType.SNAKE)).toBe(1000);
        expect(s2.maxScores.get(GameType.BOXER)).toBe(5000);
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

import { Lens } from 'monocle-ts';
import { GameStatus } from 'src/domain';
import { CoreActions } from 'src/store/core';
import { heartbeatFunc } from 'src/store/games/common-epic';
import { defaultState, newTestScheduler } from '../support';

const pauseGameLens = Lens.fromPath<AppState>()(['core', 'gameStatus']);
const BASIC_INTERVAL = 900;

describe('creep epic', () => {
  const mockCallback = jest.fn();
  const epicFunc = heartbeatFunc(BASIC_INTERVAL, [], [], mockCallback);

  beforeEach(() => {
    mockCallback.mockClear();
  });

  it('start and stop', () => {
    const state = pauseGameLens.set(GameStatus.RUNNING)(defaultState);
    newTestScheduler().run(({ hot, cold }) => {
      const intervalMs = BASIC_INTERVAL - defaultState.core.getLevel() * 100;
      const action$ = hot(`a ${intervalMs * 2}ms b`, { a: CoreActions.enterGame(), b: CoreActions.exitGame() });
      const state$ = cold('s', { s: state });
      const epic = epicFunc(action$, state$);
      epic.subscribe();
      // expectObservable(epic)
      //     .toBe('a 899ms a', {a: mockAction}); // todo try to fix mergeMap?
    });
    expect(mockCallback.mock.calls.length).toBe(2);
  });

  it('no creep when game is paused', () => {
    const state = pauseGameLens.set(GameStatus.PAUSED)(defaultState);
    newTestScheduler().run(({ hot, cold }) => {
      const action$ = hot('a 5s b', { a: CoreActions.enterGame(), b: CoreActions.exitGame() });
      const state$ = cold('s', { s: state });
      const epic = epicFunc(action$, state$);
      epic.subscribe();
    });
    expect(mockCallback.mock.calls.length).toBe(0);
  });

});

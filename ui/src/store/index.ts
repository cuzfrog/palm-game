import {CoreActions} from './action';
import {store} from './app-state';

export const initiateConsole = () => store.dispatch(CoreActions.consoleStart());
export {store} from './app-state';
export {Connects} from './connects';

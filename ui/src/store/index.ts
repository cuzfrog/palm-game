import {CoreActions} from "./action";
import {store} from "./app-state";

export {store} from "./app-state";
export {Connects} from "./connects";
export const initiateConsole = () => store.dispatch(CoreActions.consoleStart());

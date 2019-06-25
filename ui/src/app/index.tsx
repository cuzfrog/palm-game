import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.less';
import {Provider} from 'react-redux';
import {store, initiateConsole} from '../store';

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('root') as HTMLElement
);

initiateConsole();

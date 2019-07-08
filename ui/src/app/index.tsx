import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {Provider} from 'react-redux';
import {store, initiateConsole} from '../store';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
    background: #060816;
    font: 20px/1 "HanHei SC","PingHei","PingFang SC","STHeitiSC-Light","Helvetica Neue","Helvetica","Arial",sans-serif;
    text-rendering: optimizeLegibility;
    }
`;

ReactDOM.render(
    <Provider store={store}>
        <GlobalStyle/>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

initiateConsole();

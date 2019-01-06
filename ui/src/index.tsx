import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import './index.less';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

console.info('App loaded.');

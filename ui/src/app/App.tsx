import * as React from 'react';
import style from './App.less';
import Console from '../console';

class App extends React.Component {
    public render() {
        return (
            <div className={style.App}>
                <Console/>
            </div>
        );
    }
}

export default App;

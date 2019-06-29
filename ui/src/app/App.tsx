import * as React from 'react';
import style from './App.less';
import Console from '../console';
import {Information} from './Information';

class App extends React.Component {
    private readonly version: string = process.env.PACKAGE_VERSION as string;

    public render() {
        return (
            <div className={style.App}>
                <Information version={this.version}/>
                <Console/>
            </div>
        );
    }
}

export default App;

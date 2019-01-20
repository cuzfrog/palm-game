import React from 'react';
// import {connect} from 'react-redux';

import style from './Console.less';
import Decorate from './Decorate';
import Screen from './screen/Screen';
import KeyBoard from './keyboard/KeyBoard';

export default class Console extends React.PureComponent<{}, {}> {

    public render() {
        return (
            <div className={style.console}>
                <div className={style.upperRect}>
                    <Decorate/>
                    <div className={style.screenRect}>
                        <Screen/>
                    </div>
                </div>
                <div className={style.lowerRect}>
                    <KeyBoard/>
                </div>
            </div>
        );
    }
}

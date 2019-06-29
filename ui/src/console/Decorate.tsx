import React from 'react';
import style from './Decorate.less';

export default class Decorate extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <div className={style.decorate}>
                <h1 className={style.title}>Palm Game</h1>
            </div>
        );
    }
}

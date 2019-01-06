import React from 'react';
import style from './Decorate.less';

export default class Decorate extends React.Component<{}, {}> {
    public render() {
        return (
            <div className={style.decorate}>
                <h1 className={style.title}>2 IN 1</h1>
            </div>
        );
    }
}

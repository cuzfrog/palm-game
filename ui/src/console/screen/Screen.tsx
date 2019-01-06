import React from 'react';
import style from './Screen.less';

export default class Screen extends React.Component<{}, {}> {
    public render() {
        return (
            <div className={style.screen}/>
        );
    }
}

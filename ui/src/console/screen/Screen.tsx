import React from 'react';
import style from './Screen.less';
import Matrix from './Matrix';

const T = true;
const F = false;

export default class Screen extends React.Component<{}, {}> {
    public render() {

        const mockMarix = [
            [F, F, F, F, F, F, F, F, F, F],
            [F, F, F, T, F, T, F, F, F, F],
            [F, F, F, F, F, F, F, F, F, F],
        ];

        return (
            <div className={style.screen}>
                <Matrix actives={mockMarix}/>
            </div>
        );
    }
}

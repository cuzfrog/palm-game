import React from 'react';
import style from './Screen.less';
import Matrix from './Matrix';

const I = true;
const O = false;

export default class Screen extends React.PureComponent<{}, {}> {
    public render() {

        const mockMarix = [
            [O, O, O, O, O, O, O, O, O, O],
            [O, O, O, I, O, I, O, O, O, O],
            [O, O, O, O, O, O, O, O, O, O],
        ];

        return (
            <div className={style.screen}>
                <Matrix actives={mockMarix}/>
            </div>
        );
    }
}

import React from 'react';
import {connect} from 'react-redux';
import style from './Console.less';
import Decorate from './Decorate';
import Screen from './screen';
import Keyboard from './keyboard';
import {AppState} from '../store';
import {ScreenProps} from './screen/Screen';
import {KeyboardProps} from './keyboard/Keyboard';
import {Graphic} from './GraphicEngine';

interface Props {
    screenProps: ScreenProps;
    keyboardProps: KeyboardProps;
}

class Console extends React.PureComponent<Props, {}> {
    public render() {
        return (
            <div className={style.console}>
                <div className={style.upperRect}>
                    <Decorate/>
                    <div className={style.screenRect}>
                        <Screen {...this.props.screenProps}/>
                    </div>
                </div>
                <div className={style.lowerRect}>
                    <Keyboard {...this.props.keyboardProps}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState): Props {
    return {
        screenProps: {
            score: state.sys.scores.get(state.sys.gameType, 0),
            level: state.sys.level,
            frame: Graphic.show(state)
        },
        keyboardProps: state.sys.keyboardLayout
    };
}

export default connect(mapStateToProps)(Console);

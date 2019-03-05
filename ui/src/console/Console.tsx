import React from 'react';
import {connect} from 'react-redux';
import style from './Console.less';
import Decorate from './Decorate';
import Screen from './screen';
import Keyboard from './keyboard';
import {AppState} from '../store/appState';
import {KeyboardProps} from './keyboard/Keyboard';

interface Props {
    keyboardProps: KeyboardProps;
}

class Console extends React.PureComponent<Props, {}> {
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
                    <Keyboard {...this.props.keyboardProps}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState): Props {
    return {
        keyboardProps: state.core.keyboardLayout
    };
}

export default connect(mapStateToProps)(Console);

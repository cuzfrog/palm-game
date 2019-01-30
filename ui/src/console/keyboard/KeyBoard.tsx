import React from 'react';
import styles from './KeyBoard.less';
import ArrowKeys, {ArrowKeysProps} from './ArrowKeys';
import FunctionKeys, {FuncKeysProps} from './FunctionKeys';
import MainKeys, {MainKeysProps} from './MainKeys';

interface Props {
    readonly arrowProps: ArrowKeysProps;
    readonly funcProps: FuncKeysProps;
    readonly mainProps: MainKeysProps;
}

export default class extends React.PureComponent<Props, {}> {
    public render() {
        return (
            <div className={styles.keyBoard}>
                <div className={styles.arrowKeysContainer}><ArrowKeys {...this.props.arrowProps}/></div>
                <div className={styles.funcKeysContainer}><FunctionKeys {...this.props.funcProps}/></div>
                <div className={styles.mainKeysContainer}><MainKeys {...this.props.mainProps}/></div>
            </div>
        );
    }
}

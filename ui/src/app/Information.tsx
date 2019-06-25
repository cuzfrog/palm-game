import * as React from 'react';
import style from './Information.less';

interface Props {
    version: string;
}

export class Information extends React.PureComponent<Props, {}> {
    public render() {
        return (
            <div className={style.information}>
                <span>Ver {this.props.version}</span>
            </div>
        );
    }
}

import React from 'react';
import Button from './ActionButton';
import {BtnType} from './button';
import styled from 'styled-components';
import {KeysContainer} from './keys-container';

interface MainKeysProps {
    readonly actionA: () => void;
    readonly actionB: () => void;
}

const KeyAContainer = styled.div`
  left: 90px;
`;
const KeyBContainer = styled.div`
  top: 50px
`;

export default class extends React.PureComponent<MainKeysProps, {}> {
    public render() {
        return (
            <KeysContainer>
                <KeyAContainer>
                    <Button type={BtnType.MAIN} caption={'A'} action={this.props.actionA} throttleIntervalMs={200}/>
                </KeyAContainer>
                <KeyBContainer>
                    <Button type={BtnType.MAIN} caption={'B'} action={this.props.actionB} throttleIntervalMs={200}/>
                </KeyBContainer>
            </KeysContainer>
        );
    }
}

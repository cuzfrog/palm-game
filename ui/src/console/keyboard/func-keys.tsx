import React from 'react';
import {BtnType} from './button-styles';
import Button from './action-button';
import KeysContainer from './keys-container';
import styled, {css} from 'styled-components';

const FUNC_KEY_THROTTLE_INTERVAL = 300;

interface Props {
    selectAction: () => void;
    startAction: () => void;
}

const BaseFuncKeyCss = css`
  font-size: 12px;
  font-weight: bold;
  p {
    margin: 5px;
  }
`;

const SelectKeyContainer = styled.div`
  ${BaseFuncKeyCss};
`;
const StartKeyContainer = styled.div`
  ${BaseFuncKeyCss};
  left: 60px;
`;

export default class FuncKeys extends React.PureComponent<Props, {}> {
    public render() {
        return (
            <KeysContainer>
                <SelectKeyContainer>
                    <Button type={BtnType.FUNC} action={this.props.selectAction} throttleIntervalMs={FUNC_KEY_THROTTLE_INTERVAL}/>
                    <p>Select</p>
                </SelectKeyContainer>
                <StartKeyContainer>
                    <Button type={BtnType.FUNC} action={this.props.startAction} throttleIntervalMs={FUNC_KEY_THROTTLE_INTERVAL}/>
                    <p>Start</p>
                </StartKeyContainer>
            </KeysContainer>
        );
    }
}

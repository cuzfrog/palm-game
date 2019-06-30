import React from 'react';
import Decorate from './Decorate';
import Screen from './screen';
import Keyboard from './keyboard';
import styled from 'styled-components';
import {rgb} from 'polished';

const panelPrimary = 'lightskyblue';
const panelBright = rgb(172, 222, 255);
const panelDark = '#5f92bd';

const ConsoleWrapper = styled.div`
  width: 480px;
  position: absolute;
  padding-top: 50px;
  z-index: -2;

  background: ${panelPrimary};
  border: outset 3px ${panelPrimary};
  border-radius: 10px;

  user-select: none;
`;

const UpperRect = styled.div`
  width: 380px;
  padding: 28px 0 16px;
  border: #000 solid;
  border-width: 0 6px 6px;
  margin: 0 auto;
  position: relative;
`;

const ScreenRect = styled.div`
  width: 340px;
  height: 400px;
  border: solid 5px ${panelDark} ${panelBright} ${panelBright} ${panelDark};
  margin: 0 auto;
  position: relative;
  display: flex;
`;

const LowerRect = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  position: relative;
  margin-top: 20px;
  padding: 20px;
  z-index: 1;
`;

export default class Console extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <ConsoleWrapper>
                <UpperRect>
                    <Decorate/>
                    <ScreenRect>
                        <Screen/>
                    </ScreenRect>
                </UpperRect>
                <LowerRect>
                    <Keyboard/>
                </LowerRect>
            </ConsoleWrapper>
        );
    }
}

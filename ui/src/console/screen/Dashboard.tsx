import React from 'react';
import Digit, {FontSize} from './digits/Digit';
import LifeBar from './LifeBar';
import {Life} from '../../domain';
import {Connects} from '../../store';
import {VolumeMuteIcon} from './icon/VolumeMuteIcon';
import styled from 'styled-components';
import {ScreenColors} from './screenCss';

const SCORE_WIDTH = 7;
const LEVEL_WIDTH = 1;
const LIFE_HEART_COUNT = 10;

export interface DashboardProps {
    readonly score: number;
    readonly level: number;
    readonly life: Life;
    readonly enemyLife: Life;
    readonly audioMuted: boolean;
}

interface PanelProps {
    readonly isActive: boolean;
}

const heartSize = 10;
const indiWidth = 92;
const lifeWidth = (heartSize + 4) * 5;

const DashboardWrapper = styled.div`
  width: ${indiWidth}px;
  text-align: right;
  font-size: 16px;
  line-height: 16px;
  padding: 4px;

  > div > p {
    margin: 6px 2px 6px;
  }
`;

const ScorePanel = styled.div`
  margin-top: 10px;
`;

const LevelPanel = styled.div`
  margin-top: 40px;
`;

const LifePanel = styled.div`
  width: ${lifeWidth}px;
  margin-top: 40px;
  margin-left: ${indiWidth - lifeWidth}px;
  color: ${(props: PanelProps) => props.isActive ? ScreenColors.active : ScreenColors.deactivated};
  > div {
    right: 0;
  }
`;

const MiscPanel = styled.div`
  margin-top: 40px;
`;

class Dashboard extends React.PureComponent<DashboardProps, {}> {
    public render() {
        const enemyLife = getLife(this.props.enemyLife);
        const life = getLife(this.props.life);

        return (
            <DashboardWrapper>
                <ScorePanel>
                    <p>Scores</p>
                    <Digit value={this.props.score} width={SCORE_WIDTH} fontSize={FontSize.NORMAL}/>
                </ScorePanel>
                <LevelPanel>
                    <p>Level</p>
                    <Digit value={this.props.level} width={LEVEL_WIDTH} fontSize={FontSize.LARGE}/>
                </LevelPanel>

                <LifePanel isActive={this.props.enemyLife.maxHp > 0}>
                    <p>Enemy</p>
                    <LifeBar hp={enemyLife.hp} maxHp={enemyLife.maxHp} count={LIFE_HEART_COUNT}/>
                </LifePanel>
                <LifePanel isActive={this.props.life.maxHp > 0}>
                    <p>Life</p>
                    <LifeBar hp={life.hp} maxHp={life.maxHp} count={LIFE_HEART_COUNT}/>
                </LifePanel>

                <MiscPanel>
                    <VolumeMuteIcon activated={this.props.audioMuted}/>
                </MiscPanel>
            </DashboardWrapper>
        );
    }
}

function getLife(life?: Life) {
    if (life === undefined) {
        return {hp: 0, maxHp: 0};
    } else {
        return life;
    }
}

export default Connects.connectToDashboard(Dashboard); // todo: connect to every indicator?

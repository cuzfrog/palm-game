import React from "react";
import Digit, { FontSize } from "./digits/digit";
import LifeBar from "./life-bar";
import { Life, PixelState } from "src/domain";
import { Connects } from "src/store";
import { VolumeMuteIcon } from "./icon/volume-mute-icon";
import styled from "styled-components";
import { ScreenColors } from "./screen-colors";
import { Specs } from "src/specs";
import Matrix from "./matrix";

const SCORE_WIDTH = Specs.screen.scoreDigitMaxWidth;
const COUNT_WIDTH = Specs.screen.countDigitMaxWidth;
const LEVEL_WIDTH = 1;
const LIFE_HEART_COUNT = 10;

export interface DashboardProps {
  readonly score: number;
  readonly count: number;
  readonly level: number;
  readonly life: Life;
  readonly enemyLife: Life;
  readonly smallFrame: Frame;
  readonly audioMuted: boolean;
}

interface PanelProps {
  isActive: boolean;
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

const Panel = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const LifePanel = styled.div`
  width: ${lifeWidth}px;
  margin-top: 10px;
  margin-left: ${indiWidth - lifeWidth}px;
  color: ${(props: PanelProps) => props.isActive ? ScreenColors.active : ScreenColors.deactivated};
  > div {
    right: 0;
  }
`;

const SmallMatrixPanel = styled.div`
  color: ${(props: PanelProps) => props.isActive ? ScreenColors.active : ScreenColors.deactivated};
`;

const MiscPanel = styled.div`
  margin-top: 20px;
`;

class Dashboard extends React.PureComponent<DashboardProps, {}> {
  public render() {
    const enemyLife = getLife(this.props.enemyLife);
    const life = getLife(this.props.life);

    return (
      <DashboardWrapper>
        <Panel>
          <p>Scores</p>
          <Digit value={this.props.score} width={SCORE_WIDTH} fontSize={FontSize.NORMAL} />
        </Panel>
        <Panel>
          <p>Counts</p>
          <Digit value={this.props.count} width={COUNT_WIDTH} fontSize={FontSize.NORMAL} />
        </Panel>
        <Panel>
          <p>Level</p>
          <Digit value={this.props.level} width={LEVEL_WIDTH} fontSize={FontSize.LARGE} />
        </Panel>

        <LifePanel isActive={enemyLife.maxHp > 0}>
          <p>Enemy</p>
          <LifeBar hp={enemyLife.hp} maxHp={enemyLife.maxHp} count={LIFE_HEART_COUNT} />
        </LifePanel>
        <LifePanel isActive={life.maxHp > 0}>
          <p>Life</p>
          <LifeBar hp={life.hp} maxHp={life.maxHp} count={LIFE_HEART_COUNT} />
        </LifePanel>

        <SmallMatrixPanel isActive={this.props.smallFrame.includes(PixelState.ON)}>
          <p>Next</p>
          <Matrix width={4} height={2} hasBorder={false} frame={this.props.smallFrame} pixelSize={8} />
        </SmallMatrixPanel>
        <MiscPanel>
          <VolumeMuteIcon activated={this.props.audioMuted} />
        </MiscPanel>
      </DashboardWrapper>
    );
  }
}

function getLife(life?: Life) {
  if (life === undefined) {
    return { hp: 0, maxHp: 0 };
  } else {
    return life;
  }
}

export default Connects.connectToDashboard(Dashboard); // todo: connect to every indicator?

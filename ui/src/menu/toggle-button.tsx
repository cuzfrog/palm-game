import React from 'react';
import styled from 'styled-components';
import autoBind from 'auto-bind';

interface Props {
  label: string;
  initChecked: boolean;
  toggle: (checked: boolean) => void;
}

interface State {
  checked: boolean;
}

const Wrapper = styled.div`
`;

const HidenCheckbox = styled.input`
  display:none;
  :checked {
    + label {
      
    }
    + label:after{
      left: calc(100% - 1px);
	    transform: translateX(-100%);
    }
  }
`;
const StyledToogle = styled.label`
  cursor: pointer;
	width: 40px;
	height: 20px;
	background: grey;
	display: inline-block;
	border-radius: 12px;
	position: relative;
  :after{
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: 18px;
    height: 18px;
    background: #ccc;
    border-radius: 18px;
    transition: 0.3s;
  }
`;

export class Toggle extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    autoBind.react(this);
    this.state = { checked: props.initChecked };
  }

  public render() {
    const id = 'menu-toggle-' + this.props.label;
    return (
      <Wrapper>
        <span>{this.props.label}</span>
        <HidenCheckbox type='checkbox' id={id} onChange={this.handleToggle} checked={this.state.checked} />
        <StyledToogle htmlFor={id} />
      </Wrapper>
    );
  }

  private handleToggle(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ checked: event.currentTarget.checked });
    this.props.toggle(this.state.checked);
  }
}

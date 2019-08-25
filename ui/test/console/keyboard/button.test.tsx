import React from "react";
import { shallow } from "enzyme";
import Button from "src/console/keyboard/button";
import { BtnType } from "src/console/keyboard/button-styles";

const props = {
  type: BtnType.FUNC,
  actionHandler: jest.fn(),
  downHandler: jest.fn(),
  upHandler: jest.fn()
};

describe("button works", () => {
  const button = shallow(<Button  {...props} />);
  const mockEvent = {
    preventDefault: jest.fn(),
  };

  it("click", () => {
    button.simulate("click", mockEvent);
    expect(props.actionHandler).toBeCalled();
  });

  it("touchstart", () => {
    button.simulate("click", mockEvent);
    expect(props.actionHandler).toBeCalled();
  });

  it("mousedown", () => {
    button.simulate("mousedown", mockEvent);
    expect(props.downHandler).toBeCalled();
  });

  it("mouseup", () => {
    button.simulate("mouseup", mockEvent);
    expect(props.upHandler).toBeCalled();
  });
});

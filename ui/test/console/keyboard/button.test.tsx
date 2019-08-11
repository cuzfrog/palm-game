import React from 'react';
import {shallow} from 'enzyme';
import Button from 'src/console/keyboard/button';
import {BtnType} from 'src/console/keyboard/button-styles';

const props = {
    type: BtnType.FUNC,
    clickHandler: jest.fn(),
    downHandler: jest.fn(),
    upHandler: jest.fn()
};

describe('Button works', () => {
    const button = shallow(<Button  {...props} />);

    it('click', () => {
        button.simulate('click');
        expect(props.clickHandler).toBeCalled();
    });

    it('mousedown', () => {
        button.simulate('mousedown');
        expect(props.downHandler).toBeCalled();
    });

    it('mouseup', () => {
        button.simulate('mouseup');
        expect(props.upHandler).toBeCalled();
    });
});

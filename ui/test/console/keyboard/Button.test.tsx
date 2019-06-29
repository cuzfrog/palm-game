import React from 'react';
import {shallow} from 'enzyme';
import Button, {BtnType} from '../../../src/console/keyboard/Button';

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

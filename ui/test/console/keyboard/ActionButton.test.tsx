import ActionButton from '../../../src/console/keyboard/ActionButton';
import {BtnType} from '../../../src/console/keyboard/Button';
import React from 'react';
import {mount} from 'enzyme';

// jest.useFakeTimers(); not working
const action = jest.fn();
const actionThrottleInterval = 5;

beforeEach(() => {
    action.mockClear();
});

describe('ActionButton works', () => {

    const button = mount(<ActionButton type={BtnType.DOWN} action={action} throttleIntervalMs={actionThrottleInterval}/>);

    it('click triggers an action', () => {
        button.simulate('click');
        expect(action).toBeCalledTimes(1);
    });

    it('mouse down and up trigger consecutive actions', done => {
        button.simulate('mousedown');
        expect(action).not.toBeCalled();
        setTimeout(() => {
            button.simulate('mouseup');
            expect(action).toBeCalledTimes(3);
            done();
        }, actionThrottleInterval * 3.5);
    });
});

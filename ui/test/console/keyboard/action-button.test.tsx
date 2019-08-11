import ActionButton from 'src/console/keyboard/action-button';
import {BtnType} from 'src/console/keyboard/button-styles';
import React from 'react';
import {mount} from 'enzyme';

// jest.useFakeTimers(); not working
let counter = 0;
const action = () => counter++;
const actionThrottleInterval = 100;

beforeEach(() => counter = 0);

describe('ActionButton works', () => {
    const button = mount(<ActionButton type={BtnType.DOWN} action={action} throttleIntervalMs={actionThrottleInterval}/>);

    it('click triggers an action', () => {
        for (let i = 0; i < 5; i++) {
            button.simulate('click');
        }
        expect(counter).toBe(1);
    });

    it('mouse down and up trigger consecutive actions', async done => {
        button.simulate('mousedown');
        expect(counter).toBe(0);
        setTimeout(() => {
            button.simulate('mouseup');
            expect(counter).toBeCloseTo(3, 0);
            done();
        }, actionThrottleInterval * 3.5);
    });
});

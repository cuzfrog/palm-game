import {create} from 'react-test-renderer';
import ActionButton from '../../../src/console/keyboard/ActionButton';
import {BtnType} from '../../../src/console/keyboard/Button';
import React from 'react';

describe('ActionButton works', () => {
    const action = jest.fn();
    const component = create(<ActionButton type={BtnType.DOWN} action={action}/>);

    it('spec name', () => {
        const button = component.getInstance()!;
        console.dir(button.props);
    });
});

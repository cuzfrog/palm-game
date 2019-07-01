import {darken} from 'polished';

const _backgroundColor = '#9ead86';

export const ScreenColors = {
    active: '#161616',
    deactivated: darken(0.05, _backgroundColor),
    background: _backgroundColor,
};

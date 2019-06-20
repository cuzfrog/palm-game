import {BackgroundAnims} from '../../../src/store/graphic/backgroundAnim';

describe('background anim', () => {
    it('convert letter to sheet', () => {
        const a = {value: 'a|1|2', width: 1};
        const b = {value: 'bb|3|4', width: 2};
        const expected: ReadonlyArray<string> = [
            'a bb', '1 3 ', '2 4 '
        ];
        const sheet = BackgroundAnims._convertLettersToRows([a, b], '|');
        expect(sheet).toEqual(expected);
    });
});

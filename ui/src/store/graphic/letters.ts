export interface Letter {
    readonly value: string;
    readonly width: number;
}

const A = {
    value: `
III
I I
III
I I
I I
`, width: 3
};

const E = {
    value: `
III
I
III
I
III
`, width: 3
};

const P = {
    value: `
III
I I
III
I
I
`, width: 3
};

const R = {
    value: `
III
I I
III
II
I I
`, width: 3
};

const S = {
    value: `
III
I
III
  I
III
`, width: 3
};

const T = {
    value: `
III
 I
 I
 I
 I
`, width: 3
};

const SPACE = {
    value: `
O
O
O
O
O
`, width: 1
};

const SPACE5 = {
    value: SPACE.value.split(/\n/g).map(l => l.repeat(5)).join('\n'),
    width: 5
};
const PRESS_START: ReadonlyArray<Letter> = [SPACE5, P, R, E, S, S, SPACE, S, T, A, R, T, SPACE5];

export const Letters = Object.seal({
    PRESS_START
});

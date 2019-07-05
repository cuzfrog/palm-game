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

const N = {
    value: `
I  I
II I
IIII
I II
I  I
`, width: 4
};

const K = {
    value: `
I  I
I I
II
I I
I  I
`, width: 4
};

// const P = {
//     value: `
// III
// I I
// III
// I
// I
// `, width: 3
// };

// const R = {
//     value: `
// III
// I I
// III
// II
// I I
// `, width: 3
// };

const S = {
    value: `
III
I
III
  I
III
`, width: 3
};

// const T = {
//     value: `
// III
//  I
//  I
//  I
//  I
// `, width: 3
// };

const SPACE = {
    value: `
O
O
O
O
O
`, width: 1
};

const SPACE8 = spaceN(8);

function spaceN(n: number) {
    return {
        value: SPACE.value.split(/\n/g).map(l => l.repeat(n)).join('\n'),
        width: n
    };
}

const SNAKE: ReadonlyArray<Letter> = [SPACE8, S, N, A, K, E, SPACE8];

export const Letters = Object.freeze({
    SNAKE
});

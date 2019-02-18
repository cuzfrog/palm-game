function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/** complexity O(n) */
function nextEnum<T>(current: T, values: ReadonlyArray<T>): T {
    const currentIdx = values.indexOf(current);
    return currentIdx >= values.length - 1 ? values[0] : values[currentIdx + 1];
}

function identity<T>(t: T): T {
    return t;
}

function logicNot(value: boolean): boolean {
    return !value;
}

function randomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

/** Not undefined, not null, not empty string. */
function checkNonEmpty<T>(v: T): T {
    if (typeof v === 'string' && v.length === 0) {
        throw new Error('Value is empty string.');
    } else if (v === null) {
        throw new TypeError('Value is null');
    } else if (v === undefined) {
        throw new TypeError('Value is undefined');
    }
    return v;
}

function checkStrictEqual(v: any, expected: any, msg: string = `'${v}' is not strictly equal to '${expected}'!`) {
    if (!Object.is(v, expected)) {
        throw Error(msg);
    }
}

function checkStrictNonEqual(v: any, expected: any, msg: string = `'${v}' is strictly equal to '${expected}'!`) {
    if (Object.is(v, expected)) {
        throw Error(msg);
    }
}

export {
    delay,
    nextEnum,
    identity,
    logicNot,
    randomInt,
    checkNonEmpty,
    checkStrictEqual,
    checkStrictNonEqual
};

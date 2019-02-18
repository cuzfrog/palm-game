function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function nextNumEnum<T extends number>(current: T, values: ReadonlyArray<T>): T {
    return current >= values.length ? values[0] : current + 1 as T;
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
function requireNonEmpty<T>(v: T): T {
    if (typeof v === 'string' && v.length === 0) {
        throw new Error('Value is empty string.');
    } else if (v === null) {
        throw new TypeError('Value is null');
    } else if (v === undefined) {
        throw new TypeError('Value is undefined');
    }
    return v;
}

export {
    delay,
    nextNumEnum,
    identity,
    logicNot,
    randomInt,
    requireNonEmpty
};

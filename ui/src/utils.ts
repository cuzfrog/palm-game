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

export const utils = {
    delay,
    nextNumEnum,
    identity,
    logicNot,
    randomInt
};


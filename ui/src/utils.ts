function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function nextNumEnum<T extends number>(current: T, values: ReadonlyArray<T>): T {
    return current >= values.length ? values[0] : current + 1 as T;
}

export const utils = {
    delay,
    nextNumEnum
};

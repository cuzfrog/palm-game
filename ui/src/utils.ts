export const utils = {
    nextNumEnum<T extends number>(current: T, values: T[]): T {
        return current >= values.length ? values[0] : current + 1 as T;
    }
};

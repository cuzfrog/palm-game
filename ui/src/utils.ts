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

/** both params are inclusive */
function randomInt(max: number, min?: number): number {
  const base = min ? min : 0;
  requireTrue(max > base, "max must > min");
  const ceiling = max - base;
  return Math.floor(Math.random() * Math.floor(ceiling)) + base;
}

/** Not undefined, not null, not empty string. */
function checkNonEmpty<T>(v: T | undefined): T {
  if (v === null) {
    throw new TypeError("Value is null");
  } else if (v === undefined) {
    throw new TypeError("Value is undefined");
  } else if (typeof v === "string" && v.length === 0) {
    throw new Error("Value is empty string.");
  }
  return v;
}

function fallback<T>(v: T | undefined, defaultValue: T): T {
  return v ? v : defaultValue;
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

function throwTypeError(v: any): void {
  throw new TypeError("unknown type:" + v);
}

function requireTrue(condition: boolean, msg?: string) {
  if (!condition) {
    throw new Error(msg);
  }
}

function findIndexOfLast<T>(arr: ReadonlyArray<T>, predicate: (elem: T, idx: number) => boolean): number {
  for (let i = arr.length - 1; i >= 0; i--) {
    const element = arr[i];
    if (predicate(element, i)) return i;
  }
  return -1;
}

export {
  delay,
  nextEnum,
  identity,
  logicNot,
  randomInt,
  checkNonEmpty,
  fallback,
  checkStrictEqual,
  checkStrictNonEqual,
  throwTypeError,
  findIndexOfLast
};

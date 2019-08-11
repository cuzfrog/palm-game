interface Letter {
    readonly value: string;
    readonly width: number;
}

type PixelState = import('src/domain').PixelState;
type Frame = import('immutable').List<PixelState>;

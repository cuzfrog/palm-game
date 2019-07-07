interface Letter {
    readonly value: string;
    readonly width: number;
}

type PixelState = import('../../domain').PixelState;
type Frame = import('immutable').List<PixelState>;

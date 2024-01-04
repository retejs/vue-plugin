import { RenderSignal } from '../../types';
export declare type Rect = {
    width: number;
    height: number;
    left: number;
    top: number;
};
export declare type Transform = {
    x: number;
    y: number;
    k: number;
};
export declare type Translate = (dx: number, dy: number) => void;
export declare type MinimapRender = RenderSignal<'minimap', {
    ratio: number;
    nodes: Rect[];
    viewport: Rect;
    start(): Transform;
    translate: Translate;
    point(x: number, y: number): void;
}>;
//# sourceMappingURL=types.d.ts.map
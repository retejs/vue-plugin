export declare type Position = {
    x: number;
    y: number;
};
export declare type RenderSignal<Type extends string, Data> = {
    type: 'render';
    data: {
        element: HTMLElement;
        filled?: boolean;
        type: Type;
    } & Data;
} | {
    type: 'rendered';
    data: {
        element: HTMLElement;
        type: Type;
    } & Data;
};
//# sourceMappingURL=types.d.ts.map
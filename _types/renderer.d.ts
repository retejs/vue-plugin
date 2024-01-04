export declare type Renderer<I> = {
    get(element: Element): I | undefined;
    mount<P>(element: Element, vueComponent: any, payload: P, onRendered: any): I;
    update<P>(app: I, payload: P): void;
    unmount(element: Element): void;
};
export declare function getRenderer<I>(): Renderer<I>;
//# sourceMappingURL=renderer.d.ts.map
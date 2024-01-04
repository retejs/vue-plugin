import { App, Ref } from 'vue';
declare type Instance<P> = {
    app: App<Element>;
    payload: Ref<P>;
};
export declare function create<P extends object>(element: HTMLElement, component: any, payload: P, onRendered: any): Instance<P>;
export declare function update<P extends object>(instance: Instance<P>, payload: P): void;
export declare function destroy(instance: Instance<unknown>): void;
export {};
//# sourceMappingURL=vue3.d.ts.map
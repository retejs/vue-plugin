import { BaseSchemes } from 'rete';
import { VuePlugin } from '..';
declare type ComponentProps = Record<string, any> | undefined | void | null;
declare type RenderResult = {
    component: any;
    props: ComponentProps;
} | undefined | void | null;
export declare type RenderPreset<Schemes extends BaseSchemes, T> = {
    attach?: (plugin: VuePlugin<Schemes, T>) => void;
    update: (context: Extract<T, {
        type: 'render';
    }>, plugin: VuePlugin<Schemes, T>) => ComponentProps;
    render: (context: Extract<T, {
        type: 'render';
    }>, plugin: VuePlugin<Schemes, T>) => RenderResult;
};
export {};
//# sourceMappingURL=types.d.ts.map
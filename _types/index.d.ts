import { BaseSchemes, CanAssignSignal, Scope } from 'rete';
import { RenderPreset } from './presets/types';
import { Renderer } from './renderer';
import { Position, RenderSignal } from './types';
export * as Presets from './presets';
export type { ClassicScheme, VueArea2D } from './presets/classic/types';
export type { RenderPreset } from './presets/types';
export { default as Ref } from './Ref.vue';
/**
 * Signals that can be emitted by the plugin
 * @priority 10
 */
export declare type Produces<Schemes extends BaseSchemes> = {
    type: 'connectionpath';
    data: {
        payload: Schemes['Connection'];
        path?: string;
        points: Position[];
    };
};
declare type Requires<Schemes extends BaseSchemes> = RenderSignal<'node', {
    payload: Schemes['Node'];
}> | RenderSignal<'connection', {
    payload: Schemes['Connection'];
    start?: Position;
    end?: Position;
}> | {
    type: 'unmount';
    data: {
        element: HTMLElement;
    };
};
/**
 * Vue plugin. Renders nodes, connections and other elements using React.
 * @priority 9
 * @emits connectionpath
 * @listens render
 * @listens unmount
 */
export declare class VuePlugin<Schemes extends BaseSchemes, T = Requires<Schemes>> extends Scope<Produces<Schemes>, [Requires<Schemes> | T]> {
    renderer: Renderer<unknown>;
    presets: RenderPreset<Schemes, T>[];
    owners: WeakMap<HTMLElement, RenderPreset<Schemes, T>>;
    constructor();
    setParent(scope: Scope<Requires<Schemes> | T>): void;
    private unmount;
    private mount;
    /**
     * Adds a preset to the plugin.
     * @param preset Preset that can render nodes, connections and other elements.
     */
    addPreset<K>(preset: RenderPreset<Schemes, CanAssignSignal<T, K> extends true ? K : 'Cannot apply preset. Provided signals are not compatible'>): void;
}
//# sourceMappingURL=index.d.ts.map
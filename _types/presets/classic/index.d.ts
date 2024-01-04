import { Scope } from 'rete';
import { SocketPositionWatcher } from 'rete-render-utils';
import Vue, { DefineComponent, VueConstructor } from 'vue';
import { RenderPreset } from '../types';
import { ClassicScheme, ExtractPayload, VueArea2D } from './types';
export { default as Connection } from './components/Connection.vue';
export { default as Control } from './components/Control.vue';
export { default as Node } from './components/Node.vue';
export { default as Socket } from './components/Socket.vue';
declare type Component<Props extends Record<string, any>> = VueConstructor<Vue<Record<string, any>, Props>> | DefineComponent<Props, any, any, any, any, any, any, any, any, any, any>;
declare type CustomizationProps<Schemes extends ClassicScheme> = {
    node?: (data: ExtractPayload<Schemes, 'node'>) => Component<any> | null;
    connection?: (data: ExtractPayload<Schemes, 'connection'>) => Component<any> | null;
    socket?: (data: ExtractPayload<Schemes, 'socket'>) => Component<any> | null;
    control?: (data: ExtractPayload<Schemes, 'control'>) => Component<any> | null;
};
declare type ClassicProps<Schemes extends ClassicScheme, K> = {
    socketPositionWatcher?: SocketPositionWatcher<Scope<never, [K]>>;
    customize?: CustomizationProps<Schemes>;
};
/**
 * Classic preset for rendering nodes, connections, controls and sockets.
 */
export declare function setup<Schemes extends ClassicScheme, K extends VueArea2D<Schemes>>(props?: ClassicProps<Schemes, K>): RenderPreset<Schemes, K>;
//# sourceMappingURL=index.d.ts.map
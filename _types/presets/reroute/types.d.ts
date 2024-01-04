import { ConnectionId } from 'rete';
import { RenderSignal } from '../../types';
declare type Position = {
    x: number;
    y: number;
};
export declare type Pin = {
    id: string;
    position: Position;
    selected?: boolean;
};
export declare type PinData = {
    id: ConnectionId;
    pins: Pin[];
};
export declare type PinsRender = RenderSignal<'reroute-pins', {
    data: PinData;
}>;
export {};
//# sourceMappingURL=types.d.ts.map
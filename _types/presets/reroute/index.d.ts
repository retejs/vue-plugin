import { BaseSchemes } from 'rete';
import { RenderPreset } from '../types';
import { PinsRender } from './types';
declare type Props = {
    translate?: (id: string, dx: number, dy: number) => void;
    contextMenu?: (id: string) => void;
    pointerdown?: (id: string) => void;
};
/**
 * Preset for rendering pins.
 */
export declare function setup<Schemes extends BaseSchemes, K extends PinsRender>(props?: Props): RenderPreset<Schemes, K>;
export {};
//# sourceMappingURL=index.d.ts.map
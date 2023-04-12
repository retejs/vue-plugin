import { ClassicPreset as Classic, GetSchemes, NodeId } from 'rete'
import { RenderData } from 'rete-area-plugin'

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I)=> void)
  ? I
  : never
type GetControls<
  T extends ClassicScheme['Node'],
  Intersection = UnionToIntersection<T['controls']>
> = Intersection[keyof Intersection] extends Classic.Control ? Intersection[keyof Intersection] : Classic.Control
type GetSockets<
  T extends ClassicScheme['Node'],
  Intersection = UnionToIntersection<T['inputs'] | T['outputs']>,
  Union = Exclude<Intersection[keyof Intersection], undefined>
> = Union extends { socket: any } ? Union['socket'] : Classic.Socket

export type ClassicScheme = GetSchemes<Classic.Node, Classic.Connection<Classic.Node, Classic.Node> & { isLoop?: boolean }>

export type Side = 'input' | 'output'
export type VueRenderData<T extends ClassicScheme> =
| {
  element: HTMLElement,
  type: 'socket',
  payload: GetSockets<T['Node']>
  nodeId: NodeId
  side: Side
  key: string
}
| {
  element: HTMLElement,
  type: 'control',
  payload: GetControls<T['Node']>
}

export type RenderPayload<T extends ClassicScheme> = RenderData<T> | VueRenderData<T>
export type ExtractPayload<T extends ClassicScheme, K extends string> = Extract<RenderPayload<T>, { type: K }>
export type VueArea2D<T extends ClassicScheme> =
  | { type: 'render', data: RenderPayload<T> }
  | { type: 'rendered', data: RenderPayload<T> }
  | { type: 'unmount', data: { element: HTMLElement } }

export type Position = { x: number, y: number }

export type SocketPositionWatcher = (nodeId: NodeId, side: Side, key: string, onChange: (data: Position) => void) => (() => void)

export type ExtraRender = { type: 'render', data: any } | { type: 'rendered', data: any } | { type: 'unmount', data: any }

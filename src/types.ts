export type Position = { x: number, y: number }

export type RenderSignal<Type extends string, Data> =
  | { type: 'render', data: { element: HTMLElement, filled?: boolean, type: Type } & Data }
  | { type: 'rendered', data: { element: HTMLElement, type: Type } & Data }

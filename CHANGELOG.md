## v2.0.0-beta.21

Replace `change` event with `input` of classic Input control

## v2.0.0-beta.19

Breaking changes:

```ts
render.addPreset(Presets.reroute.setup({
  translate(id, dx, dy) {
    // const { k } = rea.area.transform
    // dividing by k isn't needed
    reroutePlugin.translate(id, dx, dy);
  }
}))
```

## 2.0.0-beta.18

Breaking changes: `area` property omitted from `Presets.classic.setup({ area })`

## 2.0.0-beta.14

Implemented presets for minimap and reroute


## 2.0.0-beta.13

Implemented preset for context menu plugin

## [2.0.2](https://github.com/retejs/vue-plugin/compare/v2.0.1...v2.0.2) (2023-07-17)


### Bug Fixes

* **vue2:** duplicate keys ([3e92baa](https://github.com/retejs/vue-plugin/commit/3e92baaa5dd4e46082c5e4038d592cca42c36619))
* **vue2:** unmount ([0db40b9](https://github.com/retejs/vue-plugin/commit/0db40b9cbc0ae8a018e33369bb3cd75e82250d17))

## [2.0.1](https://github.com/retejs/vue-plugin/compare/v2.0.0...v2.0.1) (2023-07-17)


### Bug Fixes

* sockets/controls rerender on update ([dabf1e4](https://github.com/retejs/vue-plugin/commit/dabf1e4a37889026c0d7840ddefb7a7991204795))
* unmount ref components ([437565b](https://github.com/retejs/vue-plugin/commit/437565be46cf906d74783d2508815b377ef0c759))

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

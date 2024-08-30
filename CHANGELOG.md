## [2.1.1](https://github.com/retejs/vue-plugin/compare/v2.1.0...v2.1.1) (2024-08-30)


### Bug Fixes

* update cli and fix linting errors ([ec9bbac](https://github.com/retejs/vue-plugin/commit/ec9bbac07647f66e10736da1664d11ec7429ce98))

# [2.1.0](https://github.com/retejs/vue-plugin/compare/v2.0.5...v2.1.0) (2024-01-31)


### Features

* add setup function to props that allows to create the vue/app instance yourself (in case you want to setup plugins, register components...) ([f752ebf](https://github.com/retejs/vue-plugin/commit/f752ebfaae176e51dc06e7d378f3f635337fb6de))

## [2.0.5](https://github.com/retejs/vue-plugin/compare/v2.0.4...v2.0.5) (2024-01-27)


### Bug Fixes

* **build:** source maps ([d3a77c0](https://github.com/retejs/vue-plugin/commit/d3a77c02968061151e8bc18aa298f8b4048f9005))

## [2.0.4](https://github.com/retejs/vue-plugin/compare/v2.0.3...v2.0.4) (2023-08-10)


### Bug Fixes

* **context-menu:** events on vue 2 ([04751db](https://github.com/retejs/vue-plugin/commit/04751db2e0fa00ca2259617822a1d0ac0ed1d66d))

## [2.0.3](https://github.com/retejs/vue-plugin/compare/v2.0.2...v2.0.3) (2023-08-07)


### Bug Fixes

* **classic:** allow custom controls with default props ([34de981](https://github.com/retejs/vue-plugin/commit/34de981a47b0561b2c4325a59c39353639d350b7))

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

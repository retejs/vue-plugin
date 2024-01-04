/*!
* rete-vue-plugin v2.0.4
* (c) 2024 Vitaliy Stoliarov
* Released under the MIT license.
* */
'use strict';



function ___$insertStylesToHeader(css) {
  if (!css) {
    return
  }
  if (typeof window === 'undefined') {
    return
  }

  const style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css
}

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = require('@babel/runtime/helpers/typeof');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _assertThisInitialized = require('@babel/runtime/helpers/assertThisInitialized');
var _get = require('@babel/runtime/helpers/get');
var _inherits = require('@babel/runtime/helpers/inherits');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var rete = require('rete');
var Vue = require('vue');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var reteRenderUtils = require('rete-render-utils');
var reteAreaPlugin = require('rete-area-plugin');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
var _get__default = /*#__PURE__*/_interopDefaultLegacy(_get);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function create(element, component, payload, onRendered) {
  var app = new Vue__default["default"]({
    props: ['payload'],
    render: function render(h) {
      return h(component, {
        props: _objectSpread$4(_objectSpread$4({}, this.payload), {}, {
          seed: Math.random()
        }),
        ref: 'child'
      });
    },
    mounted: function mounted() {
      onRendered();
    },
    updated: function updated() {
      onRendered();
    }
  });
  app.payload = payload;
  var container = document.createElement('div');
  if (container) {
    element.appendChild(container);
  }
  app.$mount(container || element);
  return app;
}
function update(app, payload) {
  app.payload = _objectSpread$4(_objectSpread$4({}, app.payload), payload);
  app.$refs.child.$forceUpdate();
}
function destroy(app) {
  app.$destroy();
  app.$el.remove();
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
function getRenderer() {
  var instances = new Map();
  return {
    get: function get(element) {
      return instances.get(element);
    },
    mount: function mount(element, vueComponent, payload, onRendered) {
      var app = create(element, vueComponent, payload, onRendered);
      instances.set(element, app);
      return app;
    },
    update: function update$1(app, payload) {
      update(app, payload);
    },
    unmount: function unmount(element) {
      var app = instances.get(element);
      if (app) {
        destroy(app);
        instances["delete"](element);
      }
    }
  };
}

var render$e = function render(){var _vm=this,_c=_vm._self._c;_vm._self._setupProxy;return _c('svg',{attrs:{"data-testid":"connection"}},[_c('path',{attrs:{"d":_vm.path}})])
};
var staticRenderFns$e = [];
render$e._withStripped = true;

___$insertStylesToHeader("/*! https://github.com/retejs/connection-plugin/commit/206ca0fd7fb82801ac45a0f7180ae05dff9ed901 */\nsvg[data-v-fee8858e] {\n  overflow: visible !important;\n  position: absolute;\n  pointer-events: none;\n  width: 9999px;\n  height: 9999px;\n}\nsvg[data-v-fee8858e] path[data-v-fee8858e] {\n  fill: none;\n  stroke-width: 5px;\n  stroke: steelblue;\n  pointer-events: auto;\n}");

function normalizeComponent (
    scriptExports,
    render,
    staticRenderFns,
    functionalTemplate,
    injectStyles,
    scopeId,
    moduleIdentifier, /* server only */
    shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
      ? scriptExports.options
      : scriptExports;

  // render functions
  if (render) {
    options.render = render;
    options.staticRenderFns = staticRenderFns;
    options._compiled = true;
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true;
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId;
  }

  var hook;
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
          context || // cached call
          (this.$vnode && this.$vnode.ssrContext) || // stateful
          (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      // register component module identifier for async chunk inference
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode
        ? function () {
          injectStyles.call(
              this,
              (options.functional ? this.parent : this).$root.$options.shadowRoot
          );
        }
        : injectStyles;
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook;
      // register for functional component in vue file
      var originalRender = options.render;
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context);
        return originalRender(h, context)
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing
          ? [].concat(existing, hook)
          : [hook];
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

const _sfc_main$e = Vue.defineComponent({
  props: ['data', 'start', 'end', 'path']
});
var __component__$e = /*#__PURE__*/normalizeComponent(
  _sfc_main$e,
  render$e,
  staticRenderFns$e,
  false,
  null,
  "fee8858e",
  null,
  null
);
__component__$e.options.__file = "/home/runner/work/vue-plugin/vue-plugin/src/presets/classic/components/Connection.vue";
var Connection = __component__$e.exports;

var render$d = function render(){var _vm=this,_c=_vm._self._c;_vm._self._setupProxy;return _c(_vm.component,{tag:"component",attrs:{"data":_vm.data,"start":_vm.startPosition,"end":_vm.endPosition,"path":_vm.observedPath}})
};
var staticRenderFns$d = [];
render$d._withStripped = true;

const _sfc_main$d = Vue.defineComponent({
  props: ['component', 'data', 'start', 'end', 'path'],
  data() {
    return {
      observedStart: { x: 0, y: 0 },
      observedEnd: { x: 0, y: 0 },
      observedPath: '',
      onDestroy: null
    }
  },
  computed: {
    startPosition() {
      if (this.start && 'x' in this.start) return this.start
      return this.observedStart
    },
    endPosition() {
      if (this.end && 'x' in this.end) return this.end
      return this.observedEnd
    }
  },
  watch: {
    startPosition() { this.fetchPath(); },
    endPosition() { this.fetchPath(); }
  },
  methods: {
    async fetchPath() {
      if (this.startPosition && this.endPosition) {
        this.observedPath = await this.path(this.startPosition, this.endPosition);
      }
    }
  },
  created() {
    const unwatch1 = typeof this.start === 'function' && this.start(pos => {
      this.observedStart = pos;
    });
    const unwatch2 = typeof this.end === 'function' && this.end(pos => {
      this.observedEnd = pos;
    });

    this.onDestroy = () => {
      unwatch1 && unwatch1();
      unwatch2 && unwatch2();
    };
  },
  destroyed() {
    if (this.onDestroy) this.onDestroy();
  }
});
var __component__$d = /*#__PURE__*/normalizeComponent(
  _sfc_main$d,
  render$d,
  staticRenderFns$d,
  false,
  null,
  null,
  null,
  null
);
__component__$d.options.__file = "/home/runner/work/vue-plugin/vue-plugin/src/presets/classic/components/ConnectionWrapper.vue";
var ConnectionWrapper = __component__$d.exports;

var render$c = function render(){var _vm=this,_c=_vm._self._c;_vm._self._setupProxy;return _c('input',{attrs:{"type":_vm.data.type,"readonly":_vm.data.readonly},domProps:{"value":_vm.data.value},on:{"input":_vm.change,"pointerdown":function($event){$event.stopPropagation();}}})
};
var staticRenderFns$c = [];
render$c._withStripped = true;

___$insertStylesToHeader("input[data-v-a4adbbb3] {\n  width: 100%;\n  border-radius: 30px;\n  background-color: white;\n  padding: 2px 6px;\n  border: 1px solid #999;\n  font-size: 110%;\n  box-sizing: border-box;\n}");

const _sfc_main$c = Vue.defineComponent({
  props: ['data'],
  methods: {
    change(e) {
      const val = this.data.type === 'number'
        ? +e.target.value
        : e.target.value;

      this.data.setValue(val);
    }
  }
});
var __component__$c = /*#__PURE__*/normalizeComponent(
  _sfc_main$c,
  render$c,
  staticRenderFns$c,
  false,
  null,
  "a4adbbb3",
  null,
  null
);
__component__$c.options.__file = "/home/runner/work/vue-plugin/vue-plugin/src/presets/classic/components/Control.vue";
var Control = __component__$c.exports;

var render$b = function render(){var _vm=this,_c=_vm._self._c;_vm._self._setupProxy;return _c('div',_vm._b({ref:"element"},'div',_vm.$props,false))
};
var staticRenderFns$b = [];
render$b._withStripped = true;

const _sfc_main$b = Vue.defineComponent({
  props: ['data', 'emit'],
  mounted() {
    this.emit({ type: 'render', data: { ...this.data, element: this.$refs.element } });
  },
  beforeDestroy() {
    this.emit({ type: 'unmount', data: { element: this.$refs.element } });
  },
  beforeUnmount() {
    this.emit({ type: 'unmount', data: { element: this.$refs.element } });
  }
});
var __component__$b = /*#__PURE__*/normalizeComponent(
  _sfc_main$b,
  render$b,
  staticRenderFns$b,
  false,
  null,
  null,
  null,
  null
);
__component__$b.options.__file = "/home/runner/work/vue-plugin/vue-plugin/src/Ref.vue";
var Ref = __component__$b.exports;

function sortByIndex(entries) {
  entries.sort((a, b) => {
    const ai = a[1] && a[1].index || 0;
    const bi = b[1] && b[1].index || 0;

    return ai - bi
  });
  return entries
}

var _sfc_main$a = Vue.defineComponent({
  props: ['data', 'emit', 'seed'],
  methods: {
    nodeStyles() {
      return {
        width: Number.isFinite(this.data.width) ? `${this.data.width}px` : '',
        height: Number.isFinite(this.data.height) ? `${this.data.height}px` : ''
      }
    },
    inputs() {
      return sortByIndex(Object.entries(this.data.inputs))
    },
    controls() {
      return sortByIndex(Object.entries(this.data.controls))
    },
    outputs() {
      return sortByIndex(Object.entries(this.data.outputs))
    }
  },
  components: {
    Ref
  }
});

var render$a = function render(){var _vm=this,_c=_vm._self._c;return _c('div',{staticClass:"node",class:{ selected: _vm.data.selected },style:(_vm.nodeStyles()),attrs:{"data-testid":"node"}},[_c('div',{staticClass:"title",attrs:{"data-testid":"title"}},[_vm._v(_vm._s(_vm.data.label))]),_vm._l((_vm.outputs()),function([key, output]){return _c('div',{key:'output' + key + _vm.seed,staticClass:"output",attrs:{"data-testid":'output-'+key}},[_c('div',{staticClass:"output-title",attrs:{"data-testid":"output-title"}},[_vm._v(_vm._s(output.label))]),_c('Ref',{staticClass:"output-socket",attrs:{"data":{ type: 'socket', side: 'output', key: key, nodeId: _vm.data.id, payload: output.socket },"emit":_vm.emit,"data-testid":"output-socket"}})],1)}),_vm._l((_vm.controls()),function([key, control]){return _c('Ref',{key:'control' + key + _vm.seed,staticClass:"control",attrs:{"data-testid":'control-'+key,"emit":_vm.emit,"data":{ type: 'control', payload: control }}})}),_vm._l((_vm.inputs()),function([key, input]){return _c('div',{key:'input' + key + _vm.seed,staticClass:"input",attrs:{"data-testid":'input-'+key}},[_c('Ref',{staticClass:"input-socket",attrs:{"data":{ type: 'socket', side: 'input', key: key, nodeId: _vm.data.id, payload: input.socket },"emit":_vm.emit,"data-testid":"input-socket"}}),_c('div',{directives:[{name:"show",rawName:"v-show",value:(!input.control || !input.showControl),expression:"!input.control || !input.showControl"}],staticClass:"input-title",attrs:{"data-testid":"input-title"}},[_vm._v(_vm._s(input.label))]),_c('Ref',{directives:[{name:"show",rawName:"v-show",value:(input.control && input.showControl),expression:"input.control && input.showControl"}],staticClass:"input-control",attrs:{"emit":_vm.emit,"data":{ type: 'control', payload: input.control },"data-testid":"input-control"}})],1)})],2)
};
var staticRenderFns$a = [];
render$a._withStripped = true;

___$insertStylesToHeader(".node[data-v-cc6bc301] {\n  background: rgba(110, 136, 255, 0.8);\n  border: 2px solid #4e58bf;\n  border-radius: 10px;\n  cursor: pointer;\n  box-sizing: border-box;\n  width: 180px;\n  height: auto;\n  padding-bottom: 6px;\n  position: relative;\n  user-select: none;\n  line-height: initial;\n  font-family: Arial;\n}\n.node[data-v-cc6bc301][data-v-cc6bc301]:hover {\n  background: rgba(130, 153, 255, 0.8);\n}\n.node[data-v-cc6bc301].selected[data-v-cc6bc301] {\n  background: #ffd92c;\n  border-color: #e3c000;\n}\n.node[data-v-cc6bc301] .title[data-v-cc6bc301] {\n  color: white;\n  font-family: sans-serif;\n  font-size: 18px;\n  padding: 8px;\n}\n.node[data-v-cc6bc301] .output[data-v-cc6bc301] {\n  text-align: right;\n}\n.node[data-v-cc6bc301] .input[data-v-cc6bc301] {\n  text-align: left;\n}\n.node[data-v-cc6bc301] .output-socket[data-v-cc6bc301] {\n  text-align: right;\n  margin-right: -18px;\n  display: inline-block;\n}\n.node[data-v-cc6bc301] .input-socket[data-v-cc6bc301] {\n  text-align: left;\n  margin-left: -18px;\n  display: inline-block;\n}\n.node[data-v-cc6bc301] .input-title[data-v-cc6bc301],\n.node[data-v-cc6bc301] .output-title[data-v-cc6bc301] {\n  vertical-align: middle;\n  color: white;\n  display: inline-block;\n  font-family: sans-serif;\n  font-size: 14px;\n  margin: 6px;\n  line-height: 24px;\n}\n.node[data-v-cc6bc301] .input-control[data-v-cc6bc301] {\n  z-index: 1;\n  width: calc(100% - 36px);\n  vertical-align: middle;\n  display: inline-block;\n}\n.node[data-v-cc6bc301] .control[data-v-cc6bc301] {\n  padding: 6px 18px;\n}");

var __component__$a = /*#__PURE__*/normalizeComponent(
  _sfc_main$a,
  render$a,
  staticRenderFns$a,
  false,
  null,
  "cc6bc301",
  null,
  null
);
__component__$a.options.__file = "/home/runner/work/vue-plugin/vue-plugin/src/presets/classic/components/Node.vue";
var Node = __component__$a.exports;

var render$9 = function render(){var _vm=this,_c=_vm._self._c;return _c('div',{staticClass:"socket",attrs:{"title":_vm.data.name}})
};
var staticRenderFns$9 = [];
render$9._withStripped = true;

___$insertStylesToHeader(".socket[data-v-4a0a4b7f] {\n  display: inline-block;\n  cursor: pointer;\n  border: 1px solid white;\n  border-radius: 12px;\n  width: 24px;\n  height: 24px;\n  margin: 6px;\n  vertical-align: middle;\n  background: #96b38a;\n  z-index: 2;\n  box-sizing: border-box;\n}\n.socket[data-v-4a0a4b7f][data-v-4a0a4b7f]:hover {\n  border-width: 4px;\n}\n.socket[data-v-4a0a4b7f].multiple[data-v-4a0a4b7f] {\n  border-color: yellow;\n}\n.socket[data-v-4a0a4b7f].output[data-v-4a0a4b7f] {\n  margin-right: -12px;\n}\n.socket[data-v-4a0a4b7f].input[data-v-4a0a4b7f] {\n  margin-left: -12px;\n}");

const _sfc_main$9 = {
  props: ['data']
};
var __component__$9 = /*#__PURE__*/normalizeComponent(
  _sfc_main$9,
  render$9,
  staticRenderFns$9,
  false,
  null,
  "4a0a4b7f",
  null,
  null
);
__component__$9.options.__file = "/home/runner/work/vue-plugin/vue-plugin/src/presets/classic/components/Socket.vue";
var Socket = __component__$9.exports;

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * Classic preset for rendering nodes, connections, controls and sockets.
 */
function setup$3(props) {
  var positionWatcher = typeof (props === null || props === void 0 ? void 0 : props.socketPositionWatcher) === 'undefined' ? reteRenderUtils.getDOMSocketPosition() : props === null || props === void 0 ? void 0 : props.socketPositionWatcher;
  var _ref = (props === null || props === void 0 ? void 0 : props.customize) || {},
    node = _ref.node,
    connection = _ref.connection,
    socket = _ref.socket,
    control = _ref.control;
  return {
    attach: function attach(plugin) {
      positionWatcher.attach(plugin);
    },
    update: function update(context, plugin) {
      var payload = context.data.payload;
      var parent = plugin.parentScope();
      if (!parent) throw new Error('parent');
      var emit = parent.emit.bind(parent);
      if (context.data.type === 'node') {
        return {
          data: payload,
          emit: emit
        };
      } else if (context.data.type === 'connection') {
        var _context$data = context.data,
          start = _context$data.start,
          end = _context$data.end;
        return _objectSpread$3(_objectSpread$3({
          data: payload
        }, start ? {
          start: start
        } : {}), end ? {
          end: end
        } : {});
      }
      return {
        data: payload
      };
    },
    // eslint-disable-next-line max-statements, complexity
    render: function render(context, plugin) {
      var parent = plugin.parentScope();
      var emit = parent.emit.bind(parent);
      if (context.data.type === 'node') {
        var component = node ? node(context.data) : Node;
        return component && {
          component: component,
          props: {
            data: context.data.payload,
            emit: emit
          }
        };
      } else if (context.data.type === 'connection') {
        var _component = connection ? connection(context.data) : Connection;
        var payload = context.data.payload;
        var source = payload.source,
          target = payload.target,
          sourceOutput = payload.sourceOutput,
          targetInput = payload.targetInput;
        return _component && {
          component: ConnectionWrapper,
          props: {
            data: context.data.payload,
            component: _component,
            start: context.data.start || function (change) {
              return positionWatcher.listen(source, 'output', sourceOutput, change);
            },
            end: context.data.end || function (change) {
              return positionWatcher.listen(target, 'input', targetInput, change);
            },
            path: function () {
              var _path = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(start, end) {
                var response, _response$data, path, points, curvature;
                return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return plugin.emit({
                        type: 'connectionpath',
                        data: {
                          payload: payload,
                          points: [start, end]
                        }
                      });
                    case 2:
                      response = _context.sent;
                      if (response) {
                        _context.next = 5;
                        break;
                      }
                      return _context.abrupt("return", '');
                    case 5:
                      _response$data = response.data, path = _response$data.path, points = _response$data.points;
                      curvature = 0.3;
                      if (!(!path && points.length !== 2)) {
                        _context.next = 9;
                        break;
                      }
                      throw new Error('cannot render connection with a custom number of points');
                    case 9:
                      if (path) {
                        _context.next = 11;
                        break;
                      }
                      return _context.abrupt("return", payload.isLoop ? reteRenderUtils.loopConnectionPath(points, curvature, 120) : reteRenderUtils.classicConnectionPath(points, curvature));
                    case 11:
                      return _context.abrupt("return", path);
                    case 12:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
              function path(_x, _x2) {
                return _path.apply(this, arguments);
              }
              return path;
            }()
          }
        };
      } else if (context.data.type === 'socket') {
        var _payload = context.data.payload;
        var _component2 = socket ? socket(context.data) : Socket;
        return {
          component: _component2,
          props: {
            data: _payload
          }
        };
      } else if (context.data.type === 'control') {
        var _payload2 = context.data.payload;
        if (control) {
          var _component3 = control(context.data);
          return _component3 && {
            component: _component3,
            props: {
              data: _payload2
            }
          };
        }
        return context.data.payload instanceof rete.ClassicPreset.InputControl ? {
          component: Control,
          props: {
            data: _payload2
          }
        } : null;
      }
    }
  };
}

var index$4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setup: setup$3,
  Connection: Connection,
  Control: Control,
  Node: Node,
  Socket: Socket
});

var render$8 = function render(){var _vm=this,_c=_vm._self._c;return _c('div',{staticClass:"block"},[_vm._t("default")],2)
};
var staticRenderFns$8 = [];
render$8._withStripped = true;

___$insertStylesToHeader(".block[data-v-e9c17765] {\n  color: #fff;\n  padding: 4px;\n  border-bottom: 1px solid rgba(69, 103, 255, 0.8);\n  background-color: rgba(110, 136, 255, 0.8);\n  cursor: pointer;\n  box-sizing: border-box;\n  width: 100%;\n  position: relative;\n}\n.block[data-v-e9c17765][data-v-e9c17765]:first-child {\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n}\n.block[data-v-e9c17765][data-v-e9c17765]:last-child {\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n}\n.block[data-v-e9c17765][data-v-e9c17765]:hover {\n  background-color: rgba(130, 153, 255, 0.8);\n}");

const _sfc_main$8 = {};
var __component__$8 = /*#__PURE__*/normalizeComponent(
  _sfc_main$8,
  render$8,
  staticRenderFns$8,
  false,
  null,
  "e9c17765",
  null,
  null
);
__component__$8.options.__file = "/home/runner/work/vue-plugin/vue-plugin/src/presets/context-menu/components/Block.vue";
var Block = __component__$8.exports;

var render$7 = function render(){var _vm=this,_c=_vm._self._c;_vm._self._setupProxy;return _c('input',{staticClass:"search",attrs:{"data-testid":"context-menu-search-input"},domProps:{"value":_vm.text},on:{"input":function($event){return _vm.$emit('change', $event.target.value)}}})
};
var staticRenderFns$7 = [];
render$7._withStripped = true;

___$insertStylesToHeader(".search[data-v-3253b3e6] {\n  color: white;\n  padding: 1px 8px;\n  border: 1px solid white;\n  border-radius: 10px;\n  font-size: 16px;\n  font-family: serif;\n  width: 100%;\n  box-sizing: border-box;\n  background: transparent;\n}");

const _sfc_main$7 = Vue.defineComponent({
  props: ['text']
});
var __component__$7 = /*#__PURE__*/normalizeComponent(
  _sfc_main$7,
  render$7,
  staticRenderFns$7,
  false,
  null,
  "3253b3e6",
  null,
  null
);
__component__$7.options.__file = "/home/runner/work/vue-plugin/vue-plugin/src/presets/context-menu/components/Search.vue";
var Search = __component__$7.exports;

function debounce(delay, cb) {
  return {
    timeout: null,
    cancel: function cancel() {
      if (this.timeout) {
        window.clearTimeout(this.timeout);
        this.timeout = null;
      }
    },
    call: function call() {
      this.timeout = window.setTimeout(function () {
        cb();
      }, delay);
    }
  };
}

var render$6 = function render(){var _vm=this,_c=_vm._self._c;return _c('Block',{staticClass:"block",class:{ hasSubitems: _vm.subitems },attrs:{"data-testid":"context-menu-item"}},[_c('div',{staticClass:"content",on:{"click":function($event){$event.stopPropagation();_vm.$emit('select', $event); _vm.$emit('hide');},"wheel":function($event){$event.stopPropagation();},"pointerover":function($event){_vm.hide.cancel(); _vm.visibleSubitems = true;},"pointerleave":function($event){return _vm.hide.call()},"pointerdown":function($event){$event.stopPropagation();}}},[_vm._t("default"),(_vm.subitems && _vm.visibleSubitems)?_c('div',{staticClass:"subitems"},_vm._l((_vm.subitems),function(item){return _c('Item',{key:item.key,attrs:{"delay":_vm.delay,"subitems":item.subitems},on:{"select":function($event){return item.handler($event)},"hide":function($event){return _vm.$emit('hide')}}},[_vm._v(_vm._s(item.label))])}),1):_vm._e()],2)])
};
var staticRenderFns$6 = [];
render$6._withStripped = true;

___$insertStylesToHeader("@charset \"UTF-8\";\n.block[data-v-fc3b2bca] {\n  padding: 0;\n}\n\n.content[data-v-fc3b2bca] {\n  padding: 4px;\n}\n\n.hasSubitems[data-v-fc3b2bca][data-v-fc3b2bca]:after {\n  content: \"►\";\n  position: absolute;\n  opacity: 0.6;\n  right: 5px;\n  top: 5px;\n}\n\n.subitems[data-v-fc3b2bca] {\n  position: absolute;\n  top: 0;\n  left: 100%;\n  width: 120px;\n}");

const _sfc_main$6 = {
  name: 'Item',
  props: ['subitems', 'delay'],
  data() {
    return {
      visibleSubitems: false,
      hide: debounce(this.delay, this.hideSubitems)
    }
  },
  methods: {
    hideSubitems() {
      this.visibleSubitems = false;
    }
  },
  components: {
    Block
  }
};
var __component__$6 = /*#__PURE__*/normalizeComponent(
  _sfc_main$6,
  render$6,
  staticRenderFns$6,
  false,
  null,
  "fc3b2bca",
  null,
  null
);
__component__$6.options.__file = "/home/runner/work/vue-plugin/vue-plugin/src/presets/context-menu/components/Item.vue";
var Item = __component__$6.exports;

var render$5 = function render(){var _vm=this,_c=_vm._self._c;_vm._self._setupProxy;return _c('div',{staticClass:"menu",attrs:{"data-testid":"context-menu","rete-context-menu":""},on:{"mouseover":function($event){return _vm.hide.cancel()},"mouseleave":function($event){return _vm.hide.call()}}},[(_vm.searchBar)?_c('Block',[_c('Search',{attrs:{"text":_vm.filter},on:{"change":function($event){_vm.filter = $event;}}})],1):_vm._e(),_vm._l((_vm.getItems()),function(item){return _c('Item',{key:item.key,attrs:{"delay":_vm.delay,"subitems":item.subitems},on:{"select":function($event){return item.handler($event)},"hide":function($event){return _vm.onHide()}}},[_vm._v(_vm._s(item.label))])})],2)
};
var staticRenderFns$5 = [];
render$5._withStripped = true;

___$insertStylesToHeader(".menu[data-v-2571168d] {\n  padding: 10px;\n  width: 120px;\n  margin-top: -20px;\n  margin-left: -60px;\n}");

const _sfc_main$5 = Vue.defineComponent({
  props: ['items', 'delay', 'searchBar', 'onHide', 'seed'],
  data() {
    return {
      filter: '',
      hide: debounce(this.delay, this.onHide)
    }
  },
  methods: {
    getItems() {
      const filterRegexp = new RegExp(this.filter, 'i');
      const filteredList = this.items.filter(item => (
        item.label.match(filterRegexp)
      ));

      return filteredList
    }
  },
  unmounted() {
    if (this.hide) this.hide.cancel();
  },
  components: {
    Block,
    Search,
    Item
  }
});
var __component__$5 = /*#__PURE__*/normalizeComponent(
  _sfc_main$5,
  render$5,
  staticRenderFns$5,
  false,
  null,
  "2571168d",
  null,
  null
);
__component__$5.options.__file = "/home/runner/work/vue-plugin/vue-plugin/src/presets/context-menu/components/Menu.vue";
var Menu = __component__$5.exports;

/**
 * Preset for rendering context menu.
 */
function setup$2(props) {
  var delay = typeof (props === null || props === void 0 ? void 0 : props.delay) === 'undefined' ? 1000 : props.delay;
  return {
    update: function update(context) {
      if (context.data.type === 'contextmenu') {
        return {
          items: context.data.items,
          delay: delay,
          searchBar: context.data.searchBar,
          onHide: context.data.onHide
        };
      }
    },
    render: function render(context) {
      if (context.data.type === 'contextmenu') {
        return {
          component: Menu,
          props: {
            items: context.data.items,
            delay: delay,
            searchBar: context.data.searchBar,
            onHide: context.data.onHide
          }
        };
      }
    }
  };
}

var index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setup: setup$2
});

function px(value) {
  return "".concat(value, "px");
}

var render$4 = function render(){var _vm=this,_c=_vm._self._c;return _c('div',{staticClass:"mini-node",style:(_vm.styles),attrs:{"data-testid":"minimap-node"}})
};
var staticRenderFns$4 = [];
render$4._withStripped = true;

___$insertStylesToHeader(".mini-node[data-v-2d96711d] {\n  position: absolute;\n  background: rgba(110, 136, 255, 0.8);\n  border: 1px solid rgba(192, 206, 212, 0.6);\n}");

const _sfc_main$4 = {
  props: ['left', 'top', 'width', 'height'],
  computed: {
    styles() {
      return {
        left: px(this.left),
        top: px(this.top),
        width: px(this.width),
        height: px(this.height)
      }
    }
  }
};
var __component__$4 = /*#__PURE__*/normalizeComponent(
  _sfc_main$4,
  render$4,
  staticRenderFns$4,
  false,
  null,
  "2d96711d",
  null,
  null
);
__component__$4.options.__file = "/home/runner/work/vue-plugin/vue-plugin/src/presets/minimap/MiniNode.vue";
var MiniNode = __component__$4.exports;

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function useDrag(translate, getPointer) {
  return {
    start: function start(e) {
      var previous = _objectSpread$2({}, getPointer(e));
      function move(moveEvent) {
        var current = _objectSpread$2({}, getPointer(moveEvent));
        var dx = current.x - previous.x;
        var dy = current.y - previous.y;
        previous = current;
        translate(dx, dy);
      }
      function up() {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        window.removeEventListener('pointercancel', up);
      }
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      window.addEventListener('pointercancel', up);
    }
  };
}

var render$3 = function render(){var _vm=this,_c=_vm._self._c;return _c('div',{staticClass:"mini-viewport",style:(_vm.styles),attrs:{"data-testid":"minimap-viewport"},on:{"pointerdown":function($event){$event.stopPropagation();return _vm.drag.start($event)}}})
};
var staticRenderFns$3 = [];
render$3._withStripped = true;

___$insertStylesToHeader(".mini-viewport[data-v-ed5fcf61] {\n  position: absolute;\n  background: rgba(255, 251, 128, 0.32);\n  border: 1px solid #ffe52b;\n}");

const _sfc_main$3 = {
  props: ['left', 'top', 'width', 'height', 'containerWidth', 'translate'],
  data() {
    return {
      drag: useDrag(this.onDrag, e => ({ x: e.pageX, y: e.pageY }))
    }
  },
  methods: {
    scale(v) {
      return v * this.containerWidth
    },
    invert(v) {
      return v / this.containerWidth
    },
    onDrag(dx, dy) {
      this.translate(this.invert(-dx), this.invert(-dy));
    }
  },
  computed: {
    styles() {

      return {
        left: px(this.scale(this.left)),
        top: px(this.scale(this.top)),
        width: px(this.scale(this.width)),
        height: px(this.scale(this.height))
      }
    }
  }
};
var __component__$3 = /*#__PURE__*/normalizeComponent(
  _sfc_main$3,
  render$3,
  staticRenderFns$3,
  false,
  null,
  "ed5fcf61",
  null,
  null
);
__component__$3.options.__file = "/home/runner/work/vue-plugin/vue-plugin/src/presets/minimap/MiniViewport.vue";
var MiniViewport = __component__$3.exports;

var render$2 = function render(){var _vm=this,_c=_vm._self._c;return _c('div',{ref:"container",staticClass:"minimap",style:({ width: _vm.px(_vm.size * _vm.ratio), height: _vm.px(_vm.size) }),attrs:{"data-testid":"minimap"},on:{"pointerdown":function($event){$event.stopPropagation();$event.preventDefault();},"dblclick":function($event){$event.stopPropagation();$event.preventDefault();return _vm.dblclick($event)}}},[_vm._l((_vm.nodes),function(node,index){return _c('MiniNode',{key:[index, node.left].join('_'),attrs:{"left":_vm.scale(node.left),"top":_vm.scale(node.top),"width":_vm.scale(node.width),"height":_vm.scale(node.height)}})}),_c('MiniViewport',{attrs:{"left":_vm.viewport.left,"top":_vm.viewport.top,"width":_vm.viewport.width,"height":_vm.viewport.height,"containerWidth":_vm.$refs.container && _vm.$refs.container.clientWidth,"translate":_vm.translate}})],2)
};
var staticRenderFns$2 = [];
render$2._withStripped = true;

___$insertStylesToHeader(".minimap[data-v-403730b0] {\n  position: absolute;\n  right: 24px;\n  bottom: 24px;\n  background: rgba(229, 234, 239, 0.65);\n  padding: 20px;\n  overflow: hidden;\n  border: 1px solid #b1b7ff;\n  border-radius: 8px;\n  box-sizing: border-box;\n}");

const _sfc_main$2 = {
  props: {
    size: Number,
    ratio: Number,
    nodes: Array,
    viewport: Object,
    translate: Function,
    point: Function,
    seed: Number
  },
  methods: {
    dblclick(e) {
      if (!this.$refs.container) return
      const box = this.$refs.container.getBoundingClientRect();
      const x = (e.clientX - box.left) / (this.size * this.ratio);
      const y = (e.clientY - box.top) / (this.size * this.ratio);

      this.point(x, y);
    },
    px,
    scale(value) {
      if (!this.$refs.container) return 0

      return value * this.$refs.container.clientWidth
    }
  },
  components: {
    MiniNode,
    MiniViewport
  }
};
var __component__$2 = /*#__PURE__*/normalizeComponent(
  _sfc_main$2,
  render$2,
  staticRenderFns$2,
  false,
  null,
  "403730b0",
  null,
  null
);
__component__$2.options.__file = "/home/runner/work/vue-plugin/vue-plugin/src/presets/minimap/Minimap.vue";
var Minimap = __component__$2.exports;

/**
 * Preset for rendering minimap.
 */
function setup$1(props) {
  return {
    update: function update(context) {
      if (context.data.type === 'minimap') {
        return {
          nodes: context.data.nodes,
          size: (props === null || props === void 0 ? void 0 : props.size) || 200,
          ratio: context.data.ratio,
          viewport: context.data.viewport,
          translate: context.data.translate,
          point: context.data.point
        };
      }
    },
    render: function render(context) {
      if (context.data.type === 'minimap') {
        return {
          component: Minimap,
          props: {
            nodes: context.data.nodes,
            size: (props === null || props === void 0 ? void 0 : props.size) || 200,
            ratio: context.data.ratio,
            viewport: context.data.viewport,
            translate: context.data.translate,
            point: context.data.point
          }
        };
      }
    }
  };
}

var index$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setup: setup$1
});

var render$1 = function render(){var _vm=this,_c=_vm._self._c;return _c('div',{staticClass:"pin",class:{ selected: _vm.selected },style:(_vm.style),attrs:{"data-testid":"pin"},on:{"pointerdown":function($event){$event.stopPropagation();$event.preventDefault();_vm.drag.start($event); _vm.$emit('down');},"contextmenu":function($event){$event.stopPropagation();$event.preventDefault();return _vm.$emit('menu')}}})
};
var staticRenderFns$1 = [];
render$1._withStripped = true;

___$insertStylesToHeader(".pin[data-v-42b064e9] {\n  width: 20px;\n  height: 20px;\n  box-sizing: border-box;\n  background: steelblue;\n  border: 2px solid white;\n  border-radius: 20px;\n}\n.pin[data-v-42b064e9].selected[data-v-42b064e9] {\n  background: #ffd92c;\n}");

const pinSize = 20;

const _sfc_main$1 = {
  props: ['position', 'selected', 'getPointer'],
  data() {
    return {
      drag: useDrag(this.onDrag, this.getPointer)
    }
  },
  computed: {
    style() {
      const { x, y } = this.position;

      return {
        position: 'absolute',
        top: `${y - pinSize / 2}px`,
        left: `${x - pinSize / 2}px`
      }
    }
  },
  methods: {
    onDrag(dx, dy) {
      this.$emit('translate', { dx, dy });
    }
  }
};
var __component__$1 = /*#__PURE__*/normalizeComponent(
  _sfc_main$1,
  render$1,
  staticRenderFns$1,
  false,
  null,
  "42b064e9",
  null,
  null
);
__component__$1.options.__file = "/home/runner/work/vue-plugin/vue-plugin/src/presets/reroute/Pin.vue";
var Pin = __component__$1.exports;

var render = function render(){var _vm=this,_c=_vm._self._c;return _c('div',{staticClass:"pins"},_vm._l((_vm.pins),function(pin){return _c('Pin',{key:pin.id,attrs:{"position":pin.position,"selected":pin.selected,"getPointer":_vm.getPointer},on:{"menu":function($event){return _vm.menu(pin.id)},"translate":function($event){return _vm.translate(pin.id, $event.dx, $event.dy)},"down":function($event){return _vm.down(pin.id)}}})}),1)
};
var staticRenderFns = [];
render._withStripped = true;

const _sfc_main = {
  props: ['pins', 'menu', 'translate', 'down', 'seed', 'getPointer'],
  components: {
    Pin
  }
};
var __component__ = /*#__PURE__*/normalizeComponent(
  _sfc_main,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  null
);
__component__.options.__file = "/home/runner/work/vue-plugin/vue-plugin/src/presets/reroute/Pins.vue";
var Pins = __component__.exports;

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * Preset for rendering pins.
 */
function setup(props) {
  var getProps = function getProps() {
    return {
      menu: (props === null || props === void 0 ? void 0 : props.contextMenu) || function () {
        return null;
      },
      translate: (props === null || props === void 0 ? void 0 : props.translate) || function () {
        return null;
      },
      down: (props === null || props === void 0 ? void 0 : props.pointerdown) || function () {
        return null;
      }
    };
  };
  return {
    update: function update(context) {
      if (context.data.type === 'reroute-pins') {
        return _objectSpread$1(_objectSpread$1({}, getProps()), {}, {
          pins: context.data.data.pins
        });
      }
    },
    render: function render(context, plugin) {
      if (context.data.type === 'reroute-pins') {
        var area = plugin.parentScope(reteAreaPlugin.BaseAreaPlugin);
        return {
          component: Pins,
          props: _objectSpread$1(_objectSpread$1({}, getProps()), {}, {
            getPointer: function getPointer() {
              return area.area.pointer;
            },
            pins: context.data.data.pins
          })
        };
      }
    }
  };
}

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setup: setup
});

/**
 * Built-in presets, responsible for rendering different parts of the editor.
 * @module
 */

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  classic: index$4,
  contextMenu: index$3,
  minimap: index$2,
  reroute: index$1
});

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Signals that can be emitted by the plugin
 * @priority 10
 */

/**
 * Vue plugin. Renders nodes, connections and other elements using React.
 * @priority 9
 * @emits connectionpath
 * @listens render
 * @listens unmount
 */
var VuePlugin = /*#__PURE__*/function (_Scope) {
  _inherits__default["default"](VuePlugin, _Scope);
  var _super = _createSuper(VuePlugin);
  function VuePlugin() {
    var _this;
    _classCallCheck__default["default"](this, VuePlugin);
    _this = _super.call(this, 'vue-render');
    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "presets", []);
    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "owners", new WeakMap());
    _this.renderer = getRenderer();
    _this.addPipe(function (context) {
      if (!context || _typeof__default["default"](context) !== 'object' || !('type' in context)) return context;
      if (context.type === 'unmount') {
        _this.unmount(context.data.element);
      } else if (context.type === 'render') {
        if ('filled' in context.data && context.data.filled) {
          return context;
        }
        if (_this.mount(context.data.element, context)) {
          return _objectSpread(_objectSpread({}, context), {}, {
            data: _objectSpread(_objectSpread({}, context.data), {}, {
              filled: true
            })
          });
        }
      }
      return context;
    });
    return _this;
  }
  _createClass__default["default"](VuePlugin, [{
    key: "setParent",
    value: function setParent(scope) {
      var _this2 = this;
      _get__default["default"](_getPrototypeOf__default["default"](VuePlugin.prototype), "setParent", this).call(this, scope);
      this.presets.forEach(function (preset) {
        if (preset.attach) preset.attach(_this2);
      });
    }
  }, {
    key: "unmount",
    value: function unmount(element) {
      this.owners["delete"](element);
      this.renderer.unmount(element);
    }
  }, {
    key: "mount",
    value: function mount(element, context) {
      var _this3 = this;
      var existing = this.renderer.get(element);
      var parent = this.parentScope();
      if (existing) {
        this.presets.forEach(function (preset) {
          if (_this3.owners.get(element) !== preset) return;
          var result = preset.update(context, _this3);
          if (result) {
            _this3.renderer.update(existing, result);
          }
        });
        return true;
      }
      var _iterator = _createForOfIteratorHelper(this.presets),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var preset = _step.value;
          var result = preset.render(context, this);
          if (!result) continue;
          this.renderer.mount(element, result.component, result.props, function () {
            return parent === null || parent === void 0 ? void 0 : parent.emit({
              type: 'rendered',
              data: context.data
            });
          });
          this.owners.set(element, preset);
          return true;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    /**
     * Adds a preset to the plugin.
     * @param preset Preset that can render nodes, connections and other elements.
     */
  }, {
    key: "addPreset",
    value: function addPreset(preset) {
      var local = preset;
      if (local.attach) local.attach(this);
      this.presets.push(local);
    }
  }]);
  return VuePlugin;
}(rete.Scope);

exports.Presets = index;
exports.Ref = Ref;
exports.VuePlugin = VuePlugin;
//# sourceMappingURL=rete-vue-plugin.common.js.map

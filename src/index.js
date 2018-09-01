import Vue from 'vue';
import defaultTemplate from './node.pug';
import './index.sass';

function createNode(editor, { el, node, component, bindSocket, bindControl }, template) {
    const app = new Vue({
        template,
        data: {
            node
        },
        methods: {
            selected(node) {
                return editor.selected.contains(node);
            },
            toClassName(str) {
                return str.toLowerCase().replace(/ /g, '-')
            },
        },
        directives: {
            socket: {
                bind(el, binding) {
                    bindSocket(el, binding.arg, binding.value);
                }
            },
            control: {
                bind(el, binding) {
                    bindControl(el, binding.value);
                }
            }
        },
        filters: {
            test(str) {
                console.log(str)
            }
        }
    });

    var nodeEl = document.createElement('div');
    el.appendChild(nodeEl);

    app.$mount(nodeEl);

    return app;
}

function createControl(editor, { el, control }) {
    const { methods } = control.component;
    methods.getData = key => control.getData.call(control, key);
    methods.putData = (key, data) => control.putData.call(control, key, data);

    const app = new Vue({
        render: h => h(control.component, { props: control.props })
    });

    var controlEl = document.createElement('div');
    el.appendChild(controlEl);
    app.$mount(controlEl);

    control.component = app.$children[0];

    return app;
}

function install(editor, params) {
    editor.on('rendernode', ({ el, node, component, bindSocket, bindControl }) => {
        if (component.render && component.render !== 'vue') return;
        node._vue = createNode(editor, { el, node, component, bindSocket, bindControl }, component.template || params.template || defaultTemplate());
    });

    editor.on('rendercontrol', ({ el, control }) => {
        if (control.render && control.render !== 'alight') return;
        control._vue = createControl(editor, { el, control });
    });

    editor.on('connectioncreated connectionremoved', connection => {
        if(connection.input.node._vue)
            connection.input.node._vue.$forceUpdate();
    });

    editor.on('nodeselected', node => {
        editor.nodes.filter(n => n._vue).map(n => n._vue.$forceUpdate());
    });
}

export default {
    install
}
import './filters';
import Node from './Node.vue';
import Socket from './Socket.vue';
import Vue from 'vue';
import mixin from './mixin';

function createVue(el, vueComponent, vueProps) {
    const app = new Vue({
        render: h => h(vueComponent, { props: vueProps })
    });

    const nodeEl = document.createElement('div');

    el.appendChild(nodeEl);
    app.$mount(nodeEl);
    
    return app;
}

function createNode(editor, { el, node, component, bindSocket, bindControl }) {
    const vueComponent = component.component || Node;
    const vueProps = { ...component.props, node, editor, bindSocket, bindControl };
    const app = createVue(el, vueComponent, vueProps);

    node.vueContext = app.$children[0];

    return app;
}

function createControl(editor, { el, control }) {
    const vueComponent = control.component;
    const vueProps = { ...control.props, getData: control.getData.bind(control), putData: control.putData.bind(control) };
    const app = createVue(el, vueComponent, vueProps);

    control.vueContext = app.$children[0];

    return app;
}

const update = (entity) => {
    if (entity.vueContext)
        entity.vueContext.$forceUpdate();
}

function install(editor, params) {
    editor.on('rendernode', ({ el, node, component, bindSocket, bindControl }) => {
        if (component.render && component.render !== 'vue') return;
        node._vue = createNode(editor, { el, node, component, bindSocket, bindControl });
        node.update = () => update(node);
    });

    editor.on('rendercontrol', ({ el, control }) => {
        if (control.render && control.render !== 'vue') return;
        control._vue = createControl(editor, { el, control });
        control.update = () => update(control)
    });

    editor.on('connectioncreated connectionremoved', connection => {
        update(connection.output.node)
        update(connection.input.node)
    });

    editor.on('nodeselected', () => {
        editor.nodes.map(update);
    });
}

export default {
    name: 'vue-render',
    install,
    mixin,
    Node,
    Socket
}

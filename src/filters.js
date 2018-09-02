import Vue from 'vue';

Vue.filter('kebab', (str) => {
    const replace = s =>  s.toLowerCase().replace(/ /g, '-');

    return Array.isArray(str) ?  str.map(replace) : replace(str);
});
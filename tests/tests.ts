// import controlPanel from '../src/control-panel/control-panel';
// const components = require.context('../src/control-panel/', true, /\..ts$/);
// components.keys().forEach(components);
// const cp = require('./control-panel');
 const tests = require.context('./src/facade/', true, /\.spec.ts$/);
 tests.keys().forEach(tests);
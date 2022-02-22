// const components = require.context('../src/control-panel/', true, /\..ts$/);
// components.keys().forEach(components);

const tests = require.context('./src/facade/', true, /\.spec.ts$/);
 tests.keys().forEach(tests);
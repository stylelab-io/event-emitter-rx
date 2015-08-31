module.exports = function (w) {

  return {
    files: [
      'EventEmitterRx.ts'
    ],

    tests: [
      'EventEmitterRx.spec.ts'
    ],
    testFramework: 'mocha',
    env: {
      type: 'node'
    },
    // TypeScript compiler is on by default with default options,
    // you can configure built-in compiler by passing options to it
    // See interface CompilerOptions in
    // https://github.com/Microsoft/TypeScript/blob/master/src/compiler/types.ts
    compilers: {
     '**/*.ts': w.compilers.typeScript({
        module: 1
     })
   },
   debug: true
  };
};

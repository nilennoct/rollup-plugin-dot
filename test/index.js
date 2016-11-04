var assert = require('assert');
var { rollup } = require('rollup');
var dot = require('../');

process.chdir('test');

function makeBundle(options, dotOptions) {
    options.plugins = [dot(dotOptions)];
    return rollup(options);
}

describe('rollup-plugin-dot', () => {
    it('should stringify importing template', () => {
        return makeBundle({ entry: 'fixtures/main.js' }, { include: '**/*.dot' }).then(bundle => {
            const { code } = bundle.generate({ format: 'iife', moduleName: 'view' });
            new Function('assert', code)(assert);
        });
    });

    it('should output empty sourcemap', () => {
        return makeBundle({ entry: 'fixtures/main.js' }, { include: '**/*.dot' }).then(bundle => {
            const { code, map } = bundle.generate({ sourceMap: true });
            assert.ok(code);
            assert.ok(map);
        });
    });
});

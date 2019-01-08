///<reference types="mocha"/>
import * as assert from 'assert';
import { readFileSync } from 'fs';
import * as rollup from 'rollup';
import * as dot from '..';

process.chdir('test');

function makeBundle(options: rollup.RollupOptions, dotOptions?: dot.Options) {
    options.plugins = [dot(dotOptions)];

    return rollup.rollup(options);
}

describe('rollup-plugin-dot', () => {
    const env = process.env.NODE_ENV || 'development';

    it('should stringify importing template correctly', async () => {
        const bundle = await makeBundle({ input: 'samples/basic/main.js' }, { include: 'samples/basic/view.dot' });
        const { output } = await bundle.generate({ format: 'iife' });

        assert.ok(output[0].code);
        assert.doesNotThrow(() => {
            new Function('assert', output[0].code!)(assert);
        });
    });

    it('should output empty sourcemap correctly', async () => {
        const bundle = await makeBundle({ input: 'samples/basic/main.js' });
        const { output } = await bundle.generate({ format: 'iife', sourcemap: true });

        assert.ok(output[0].code);
    });

    it('should include doT defines correctly', async () => {
        const bundle = await makeBundle({ input: 'samples/defines/main.js' }, {
            defines: {
                env,
                time: () => Date.now(),
            },
        });
        const { output } = await bundle.generate({ format: 'iife' });

        assert.ok(output[0].code);
        assert.doesNotThrow(() => {
            new Function('assert', 'env', output[0].code!)(assert, env);
        });
    });

    it('should bundle files correctly', function () {
        const code = readFileSync('output/bundle.js', 'utf8');

        assert.doesNotThrow(() => {
            new Function('assert', 'env', code)(assert, env);
        });
    });
});

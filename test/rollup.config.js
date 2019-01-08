import dot from '..';

export default {
    input: 'test/samples/defines/main.js',
    output: {
        file: 'test/output/bundle.js',
        format: 'iife',
    },
    plugins: [
        dot({
            include: ['**/*.dot', '**/*.tpl'], // default to `**/*.dot`
            exclude: ['**/index.tpl'], // default to `undefined`
            templateSettings: { strip: false }, // doT template settings, default to `undefined`
            defines: { // doT template defines, default to `undefined`
                env: process.env.NODE_ENV || 'development',
                time: () => Date.now(),
            },
        }),
    ],
};

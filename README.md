# rollup-plugin-dot

rollup plugin to compile doT files.

`view.dot`

```html
<p>{{= it.message }}</p>
```

`main.js`

```js
import view from './view.dot';
let data = { message: 'Hello world' };
console.log(`Render result: ${view(data)}`);
```

## Installation

```shell
yarn add -D rollup-plugin-dot

// Or use npm
npm install -D rollup-plugin-dot
```

## Usage

`rollup.config.js`

```js
import dot from 'rollup-plugin-dot';

export default {
	input: 'src/index.js',
	output: {
        file: 'dist/bundle.js',
        format: 'iife',
    },
	plugins: [
		dot({
			include: ['**/*.dot', '**/*.tpl'], // default to `**/*.dot`
			exclude: ['**/index.tpl'], // default to `undefined`
			templateSettings: { strip: false }, // doT template settings, default to doT's default settings
			defines: { // doT template defines, default to `undefined`
			    env: process.env.NODE_ENV || 'development',
			},
		}),
	],
};
```

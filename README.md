# rollup-plugin-string

rollup plugin to compile doT files.

```html
<p>{{= it.message }}</p>
```

```js
import view from './view.dot';
let data = { message: 'Hello world' };
console.log(`Render result: ${view(data)}`);
```

## Installation

```sh
npm i rollup-plugin-dot -D
```

## Usage

```js
import { rollup } from 'rollup';
import dot from 'rollup-plugin-dot';

rollup({
	entry: 'src/index.js',
	plugins: [
		dot({
			include: ['**/*.dot', '**/*.tpl'], // default to '**/*.dot'
			exclude: ['**/index.html'], // default to undefined
			templateSettings: { strip: false } // doT template settings, default to undefined
		})
	]
});
```

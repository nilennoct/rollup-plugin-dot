import view from "./view.dot";

assert.strictEqual(typeof view, 'function');
assert.strictEqual(view({ message: 'it works!' }), '<p>it works!</p>');

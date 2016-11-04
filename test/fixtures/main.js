import view from "./view.dot";

assert.equal(typeof view, 'function');
assert.equal(view({ message: 'it works!' }), '<p>it works!</p>');

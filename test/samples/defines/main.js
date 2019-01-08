import view from "./view.dot";

assert.strictEqual(typeof view, 'function');

const template = view();
assert.strictEqual(typeof template, 'string');
assert.ok(template.includes(`<span>${env}</span>`));
assert.ok(/<span>\d+<\/span>/.test(template));

import { createFilter } from "rollup-pluginutils";
import doT from "dot";

/**
 * @param {Object} [options={}]
 * @param {string|Array.<string>} [options.include]
 * @param {string|Array.<string>} [options.exclude]
 * @param {Object} [options.templateSettings]
 * @return {Object}
 */
export default function dot(options = {}) {
    if (!options.include) {
        options.include = '**/*.dot';
    }

    const filter = createFilter(options.include, options.exclude);

    return {
        name: 'dot',

        transform(code, id) {
            if (filter(id)) {
                let templateSettings = null;

                if (options.templateSettings) {
                    templateSettings = Object.assign({}, doT.templateSettings, options.templateSettings)
                }

                return {
                    code: `export default ${doT.template(code, templateSettings)};`,
                    map: { mappings: '' }
                };
            }
        }
    };
}

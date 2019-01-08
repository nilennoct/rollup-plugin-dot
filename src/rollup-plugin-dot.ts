import * as doT from 'dot';
import * as path from 'path';
import { createFilter, makeLegalIdentifier } from 'rollup-pluginutils';

function dot(options: dot.Options = {}) {
    if (!options.include) {
        options.include = '**/*.dot';
    }

    const filter = createFilter(options.include, options.exclude);

    return {
        name: 'dot',

        transform(code: string, id: string): void | { code: string, map: { mappings: '' } } {
            if (filter(id)) {
                let templateSettings;

                if (options.templateSettings) {
                    templateSettings = {
                        ...doT.templateSettings,
                        ...options.templateSettings,
                    };
                }

                const renderFunction = doT.template(code, templateSettings, options.defines);
                const templateCode = renderFunction.toString()
                    .replace(/^function anonymous\(/, `function ${makeTemplateFunctionName(id)}(`);

                return {
                    code: `export default ${templateCode};`,
                    map: { mappings: '' },
                };
            }
        },
    };
}

function makeTemplateFunctionName(id: string): string {
    if (path.isAbsolute(id)) {
        id = path.relative(process.cwd(), id);
    }

    return makeLegalIdentifier(`dot_tpl_${id}`);
}

namespace dot {
    export interface Options {
        include?: string | string[];
        exclude?: string | string[];
        templateSettings?: Partial<doT.TemplateSettings>;
        defines?: {};
    }
}

export default dot;

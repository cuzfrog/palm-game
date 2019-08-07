const ModuleDependencyWarning = require('webpack/lib/ModuleDependencyWarning');

module.exports = class IgnoreNotFoundExportPlugin {
    constructor(exportsToIgnore) {
        this.exportsToIgnore = exportsToIgnore || [];
    }

    getMessageRegExp() {
        if (this.exportsToIgnore.length > 0) {
            return new RegExp(
                `export '${
                    this.exportsToIgnore
                    }'( \\(reexported as '.*'\\))? was not found in`,
            );
        } else {
            return /export '.*'( \(reexported as '.*'\))? was not found in/;
        }
    }

    apply(compiler) {
        const messageRegExp = this.getMessageRegExp();

        const doneHook = stats => {
            stats.compilation.warnings = stats.compilation.warnings.filter(
                warn => {
                    return !(warn instanceof ModuleDependencyWarning &&
                        messageRegExp.test(warn.message));

                },
            );
        };

        if (compiler.hooks) {
            compiler.hooks.done.tap('IgnoreNotFoundExportPlugin', doneHook);
        } else {
            compiler.plugin('done', doneHook);
        }
    }
};

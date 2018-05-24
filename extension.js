const vscode = require('vscode');
const pageBreaks = require('./pageBreaks');

function activate(context) {
    return {
        extendMarkdownIt(md) {
            return md.use(pageBreaks);
        }
    };
}

exports.activate = activate;
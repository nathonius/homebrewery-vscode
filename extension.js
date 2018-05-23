const vscode = require('vscode');
const pageBreaks = require('./pageBreaks');

function activate(context) {
    console.log("activated");
    return {
        extendMarkdownIt(md) {
            return md.use(pageBreaks);
        }
    };
}

exports.activate = activate;
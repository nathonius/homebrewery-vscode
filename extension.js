const vscode = require('vscode');
const pageBreaks = require('./pageBreaks');

function activate(context) {
    const settings = vscode.workspace.getConfiguration('homebrewery');

    context.subscriptions.push(vscode.commands.registerCommand('homebrewery.toggle', () =>{
        settings.update('enabled', !settings.get('enabled'));
    }));

    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(cfg => {
        if(cfg.affectsConfiguration('homebrewery.enabled')) {
            vscode.commands.executeCommand('markdown.refreshPreview');
        }
    }));

    return {
        extendMarkdownIt(md) {
            return md.use(pageBreaks);
        }
    };
}

exports.activate = activate;
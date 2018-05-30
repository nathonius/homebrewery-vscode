const vscode = require('vscode');
const pageBreaks = require('./pageBreaks');

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('homebrewery.toggle', () =>{
        const settings = vscode.workspace.getConfiguration('homebrewery');
        settings.update('enabled', !settings.get('enabled'), true);
    }));

    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(cfg => {
        if(cfg.affectsConfiguration('homebrewery.enabled')) {
            vscode.commands.executeCommand('markdown.preview.refresh', undefined);
        }
    }));

    return {
        extendMarkdownIt(md) {
            return md.use(pageBreaks);
        }
    };
}

exports.activate = activate;
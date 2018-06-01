const vscode = require('vscode');
const pageBreaks = require('./pageBreaks');
const path = require('path');
const ncp = require('ncp').ncp;
const fs = require('fs');
const Markdown = require('markdown-it');

function brew() {
    const editor = vscode.window.activeTextEditor;
    const doc = editor.document;

    if(!editor || doc.languageId != 'markdown') {
        vscode.window.showErrorMessage('Homebrewery: No valid Markdown file');
        return;
    }

    else if(doc.isUntitled) {
        vscode.window.showErrorMessage('Homebrewery: Please save the file first');
        return;
    }

    if(doc.isDirty) {
        doc.save();
    }

    vscode.window.setStatusBarMessage(`Printing '${path.basename(doc.fileName)}' to HTML ...`, 1000);
    let outPath = doc.fileName.replace(/\.\w+?$/, `.html`);
    outPath = outPath.replace(/^([cdefghij]):\\/, function (match, p1) {
        return `${p1.toUpperCase()}:\\`; // Capitalize drive letter
    });
    if(!outPath.endsWith('.html')) {
        outPath += '.html';
    }

    const md = new Markdown().use(pageBreaks);
    const body = md.render(doc.getText());
    const html = `<!DOCTYPE html>
    <html>
    <head>
        <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
        <link rel="stylesheet" href="phb.standalone.css">
    </head>
    <body>
        ${body}
    </body>
    </html>`;

    fs.writeFile(outPath, html, 'utf-8', function (err) {
        if (err) { console.log(err); }
    });

    const assetPath = path.join(vscode.extensions.getExtension('officerhalf.homebrewery-vscode').extensionPath, 'homebrewery-assets');
    ncp(assetPath, path.dirname(outPath), (err) => {
        if(err) {
            console.error(err);
        }
    });
}

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('homebrewery.brew', brew));

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
const divRe = /\<div.*\>\n/;

// Allow for content directly after a div with only one newline
function fixDivs(state) {

    if (state.tokens.length === 0) {
        return;
    }

    for (let i = 0; i < state.tokens.length; i++) {
        if (state.tokens[i].type === 'html_block' && divRe.test(state.tokens[i].content)) {
            let newContent;
            [state.tokens[i].content, ...newContent] = state.tokens[i].content.split(divRe);
            if (newContent.length > 0) {
                newContent = newContent.join('');
                state.md.core.ruler.disable('replacePages'); // don't want new pages added at the beginning and end
                newTokens = state.md.parse(newContent, {});
                state.md.core.ruler.enable('replacePages'); // re-enable.
                state.tokens.splice(i + 1, 0, ...newTokens);
            }
        }
    }
}

function replacePages(state) {
    if (state.tokens.length === 0) {
        return;
    }
    if (state.tokens[0].type !== 'pageBr_open') {
        const open = new state.Token('pageBr_open', 'div', 1);
        open.attrPush(['class', 'phb']);
        open.attrPush(['id', 'p1']);
        open.attrPush(['style', 'margin-bottom: 30px;']);
        state.tokens.splice(0, 0, open);
    }
    for (let i = state.tokens.length - 1; i >= 0; i--) {
        if (state.tokens[i].type !== 'inline') { continue; }
        if (state.tokens[i].content === '\\page') {
            let token;
            const inlineTokens = state.tokens[i].children;
            for (let j = inlineTokens.length - 1; j >= 0; j--) {
                token = inlineTokens[j];
                if (token.type === 'text') {
                    if (token.content === '\\page') {
                        replaceToken(state, i);
                        break;
                    }
                }
            }
        }
    }
}

function replaceToken(state, tokenPos) {
    const close = new state.Token('pageBr_close', 'div', -1);
    const open = new state.Token('pageBr_open', 'div', 1);
    open.attrPush(['class', 'phb']);
    open.attrPush(['style', 'margin-bottom: 30px;']);

    state.tokens[tokenPos - 1] = close;
    state.tokens[tokenPos + 1] = open;
    state.tokens.splice(tokenPos, 1);
}

module.exports = function replacePages_plugin(md, scheme) {
    md.core.ruler.before('replacements', 'replacePages', replacePages);
    md.core.ruler.after('replacements', 'fixDivs', fixDivs);
};
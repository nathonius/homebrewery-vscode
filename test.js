const Markdown = require('markdown-it');
const pageBreaks = require('./pageBreaks');

const md = new Markdown().use(pageBreaks);
const html = md.render('\\page');

console.log(html);
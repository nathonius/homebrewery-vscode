Styles the markdown preview pane like the [Homebrewery](http://homebrewery.naturalcrit.com/), so that you can create 5th Edition D&D homebrew in a more powerful application.

![preview-image](https://raw.githubusercontent.com/OfficerHalf/homebrewery-vscode/master/docs/images/Preview.PNG)

## Features
- Most markdown and formatting from the Homebrewery is supported.
- Use `\page` to create new pages.
- Most of the same snippets The Homebrewery provides are available with the 'brew' prefix. Ex: `brewStatBlock`

## Commands
#### `homebrewery.toggle`
toggles the `homebrewery.enabled` setting

### `homebrewery.brew`
print to HTML

## Settings
#### `homebrewery.enabled`
use homebrewery formatting in the markdown preview pane. `true` by default.

## Usage
For best results, set the following options:
- `"markdown.preview.scrollEditorWithPreview": false`
- `"markdown.preview.scrollPreviewWithEditor": false`
- `"markdown.preview.markEditorSelection": false`

This prevents the preview jumping around and stops the formatting breaking when mousing over selections in the preview window.

## Known Issues
- Any div element used requires a new line between the div and its content
- The HTML rendered by the `homebrewery.brew` command is sometimes _slightly_ different than the preview.
- Images from external URLs may not be shown. This is due to security restrictions on Code's markdown preview. For best results, ensure that all image urls use `https://`. Though it is not recommended, you can also [disable security](https://code.visualstudio.com/docs/languages/markdown#_markdown-preview-security).
- The preview will sometimes scroll to the wrong place. See [Usage](#usage) above.

## To-Do List
- Allow for alternate styles and color palettes
---
## Release Notes
### 0.1.0
- Added brew command to print to HTML

### 0.0.4
- Added remaining snippets
- Both manual and auto page numbering work.

### 0.0.3
- Added toggle command to enable/disable homebrewery formatting

### 0.0.2
- Added most snippets
- Fixed empty file error

See [Changelog](CHANGELOG.md) for more.

Styles the markdown preview pane like the [Homebrewery](http://homebrewery.naturalcrit.com/), so that you can create 5th Edition D&D homebrew in a more powerful application.

![preview-image](https://raw.githubusercontent.com/OfficerHalf/homebrewery-vscode/master/docs/images/Preview.PNG)

## Features
- Most markdown and formatting from the Homebrewery is supported.
- Use `\page` to create new pages.
- Most of the same snippets The Homebrewery provides are available with the 'brew' prefix. Ex: `brewStatBlock`

## Known Issues
- Any div element used requires a new line between the div and its content
- Class tables are broken
- Background images are broken.
- Wide block is offset incorrectly.
- Images from external URLs may not be shown. This is due to security restrictions on Code's markdown preview. For best results, ensure that all image urls use `https://`. Though it is not recommended, you can also [disable security](https://code.visualstudio.com/docs/languages/markdown#_markdown-preview-security).
- The preview will sometimes scroll to the wrong place. This is a problem with Code.

## To-Do List
- Add command to enable/disable styling, even if it requires restarting Code.
- Add command to export as html. For now, just copy and paste into the homebrewery.
- Add remaining snippets
---
## Release Notes
### 0.0.2
- Added most snippets
- Fixed empty file error

### 0.0.1
- Initial Release

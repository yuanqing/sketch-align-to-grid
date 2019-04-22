# Align to Grid

> A Sketch plugin to align artboards and layers to a grid

## Usage

### Align artboards to canvas grid

- Operates on artboards in the selection, or on all artboards on the current page if the selection is empty
- Skips certain artboards based on a whitelist regular expression

Settings | Default
:--|:--
Grid width (pixels) | `200`
Grid height (pixels) | `200`
Whitelist regular expression | `^@`
Snap to canvas grid | `false`

### Align layers to artboard grid

- Operates on layers in the selection, or on all layers within artboards on the current page if the selection is empty
- Skips certain layers based on a whitelist regular expression

Settings | Default
:--|:--
Grid size (pixels) | `200`
Whitelist regular expression | `^@`
Snap to artboard grid | `false`

## Installation

1. [Download and unzip the latest release](https://github.com/yuanqing/sketch-align-to-grid/releases)
2. Double-click `Align to Grid.sketchplugin` to install

## License

[MIT](LICENSE.md)

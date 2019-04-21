import {
  openSettingsDialog,
  saveSettings,
  CHECK_BOX,
  NUMERIC_TEXT_BOX,
  TEXT_BOX
} from 'sketch-plugin-helper'

const settingsConfig = {
  title: 'Canvas Grid Settings',
  inputs: [
    {
      type: NUMERIC_TEXT_BOX,
      key: 'alignArtboardsToCanvasGrid.gridWidth',
      label: 'Grid width'
    },
    {
      type: NUMERIC_TEXT_BOX,
      key: 'alignArtboardsToCanvasGrid.gridHeight',
      label: 'Grid height'
    },
    {
      type: TEXT_BOX,
      key: 'alignArtboardsToCanvasGrid.whitelistRegularExpression',
      label: 'Whitelist regular expression'
    },
    {
      type: CHECK_BOX,
      key: 'alignArtboardsToCanvasGrid.snapToGrid',
      label: 'Snap artboards to canvas grid'
    }
  ]
}

export default function settings () {
  const settings = openSettingsDialog(settingsConfig)
  if (settings) {
    saveSettings(settings, { successMessage: 'Settings saved' })
  }
}

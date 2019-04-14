import {
  openSettingsDialog,
  saveSettings,
  NUMERIC_TEXT_BOX,
  TEXT_BOX
} from 'sketch-plugin-helper'

const settingsConfig = {
  title: 'Settings',
  inputs: [
    {
      type: NUMERIC_TEXT_BOX,
      key: 'gridWidth',
      label: 'Grid width'
    },
    {
      type: NUMERIC_TEXT_BOX,
      key: 'gridHeight',
      label: 'Grid height'
    },
    {
      type: TEXT_BOX,
      key: 'ignoreRegularExpression',
      label: 'Ignore regular expression'
    }
  ]
}

export default function settings () {
  const settings = openSettingsDialog(settingsConfig)
  if (settings) {
    saveSettings(settings, { successMessage: 'Settings saved' })
  }
}

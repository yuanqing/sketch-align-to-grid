import { CHECK_BOX, NUMERIC_TEXT_BOX, TEXT_BOX } from 'sketch-plugin-helper'

import settingsFactory from '../settings/settings-factory'

const settingsConfig = {
  title: 'Settings for Artboard Grid',
  formFields: [
    {
      type: NUMERIC_TEXT_BOX,
      key: 'alignLayersToArtboardGrid.gridSize',
      label: 'Grid size'
    },
    {
      type: TEXT_BOX,
      key: 'alignLayersToArtboardGrid.whitelistRegularExpression',
      label: 'Whitelist regular expression'
    },
    {
      type: CHECK_BOX,
      key: 'alignLayersToArtboardGrid.snapToGrid',
      label: 'Snap layers to artboard grid'
    }
  ]
}

export default settingsFactory(settingsConfig)

import { CHECK_BOX, NUMERIC_TEXT_BOX, TEXT_BOX } from 'sketch-plugin-helper'

import settingsFactory from '../settings/settings-factory'

const settingsConfig = {
  title: 'Settings for Canvas Grid',
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

export default settingsFactory(settingsConfig)

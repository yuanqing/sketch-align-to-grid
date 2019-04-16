import {
  iterateNestedLayers,
  getSelectedLayersOrLayersOnCurrentPage,
  getSettings,
  showSuccessMessage
} from 'sketch-plugin-helper'

import snapLayerToGrid from './snap-layer-to-grid'

export default function snapLayersToGrid ({ isAction, layers }) {
  const settings = getSettings()
  const gridWidth = settings['snapLayersToGrid.gridWidth']
  const gridHeight = settings['snapLayersToGrid.gridHeight']
  const regularExpression =
    settings['snapLayersToGrid.whitelistRegularExpression']
  const whitelistRegularExpression = regularExpression
    ? new RegExp(regularExpression)
    : null
  layers = layers || getSelectedLayersOrLayersOnCurrentPage()
  iterateNestedLayers(layers, function (layer) {
    if (
      layer.type === 'Artboard' ||
      layer.type === 'Group' ||
      (whitelistRegularExpression &&
        whitelistRegularExpression.test(layer.name))
    ) {
      return
    }
    snapLayerToGrid({ layer, gridWidth, gridHeight })
  })
  if (!isAction) {
    showSuccessMessage('Snapped layers to grid')
  }
}

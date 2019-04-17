import {
  adjustParentGroupsToFit,
  getCoordinatesRelativeToArtboard,
  getSelectedLayersOrLayersOnCurrentPage,
  getSettings,
  iterateNestedLayers,
  showSuccessMessage
} from 'sketch-plugin-helper'

import roundDown from '../round-down'

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

function snapLayerToGrid ({ layer, gridWidth, gridHeight }) {
  const { x, y } = getCoordinatesRelativeToArtboard(layer)
  const newX = roundDown({ value: x, multiple: gridWidth })
  const newY = roundDown({ value: y, multiple: gridHeight })
  layer.frame.x = layer.frame.x + newX - x
  layer.frame.y = layer.frame.y + newY - y
  adjustParentGroupsToFit(layer)
}

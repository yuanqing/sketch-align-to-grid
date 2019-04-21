import {
  adjustParentGroupsToFit,
  getCoordinatesRelativeToArtboard,
  getLayersOnCurrentPage,
  getSelectedLayers,
  getSettings,
  iterateNestedLayers,
  showSuccessMessage
} from 'sketch-plugin-helper'

import roundDown from '../round-down'

export default function alignLayersToArtboardGrid ({ isAction, layers }) {
  const {
    gridSize,
    whitelistRegularExpression
  } = getSettings().alignLayersToArtboardGrid
  const regularExpression = whitelistRegularExpression
    ? new RegExp(whitelistRegularExpression)
    : null
  const selectedLayers = getSelectedLayers()
  const hasSelection = selectedLayers.length > 0
  layers = layers || (hasSelection ? selectedLayers : getLayersOnCurrentPage())
  iterateNestedLayers(layers, function (layer) {
    if (
      layer.type === 'Artboard' ||
      layer.type === 'Group' ||
      !layer.getParentArtboard() ||
      (regularExpression && regularExpression.test(layer.name))
    ) {
      return
    }
    snapLayerToGrid({ layer, gridSize })
  })
  if (!isAction) {
    showSuccessMessage(
      `Aligned ${hasSelection ? 'selection' : 'all layers'} to artboard grid`
    )
  }
}

function snapLayerToGrid ({ layer, gridSize }) {
  const { x, y } = getCoordinatesRelativeToArtboard(layer)
  const newX = roundDown({ value: x, multiple: gridSize })
  const newY = roundDown({ value: y, multiple: gridSize })
  layer.frame.x = layer.frame.x + newX - x
  layer.frame.y = layer.frame.y + newY - y
  adjustParentGroupsToFit(layer)
}

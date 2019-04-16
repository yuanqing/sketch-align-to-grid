import {
  adjustParentGroupsToFit,
  getCoordinatesRelativeToArtboard
} from 'sketch-plugin-helper'

import roundDown from '../round-down'

export default function snapLayerToGrid ({ layer, gridWidth, gridHeight }) {
  const { x, y } = getCoordinatesRelativeToArtboard(layer)
  const newX = roundDown({ value: x, multiple: gridWidth })
  const newY = roundDown({ value: y, multiple: gridHeight })
  layer.frame.x = layer.frame.x + newX - x
  layer.frame.y = layer.frame.y + newY - y
  adjustParentGroupsToFit(layer)
}

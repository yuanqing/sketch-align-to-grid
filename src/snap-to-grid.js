import { getArtboardsOnCurrentPage, getSettings } from 'sketch-plugin-helper'

import createGrid from './create-grid'

export default function snapToGrid () {
  const { gridHeight, gridWidth, ignoreRegularExpression } = getSettings()
  const layers = getArtboards(ignoreRegularExpression)
  const grid = createGrid({ layers, gridWidth, gridHeight })
  updateLayerPositions(grid)
}

function getArtboards (ignoreRegularExpression) {
  const artboards = getArtboardsOnCurrentPage()
  if (!ignoreRegularExpression) {
    return artboards
  }
  const regularExpression = new RegExp(ignoreRegularExpression)
  return artboards.filter(function (artboard) {
    return !regularExpression.test(artboard.name)
  })
}

function updateLayerPositions (grid) {
  grid.forEach(function ({ y, layers }) {
    layers.forEach(function ({ x, layer }) {
      layer.frame.x = x
      layer.frame.y = y
    })
  })
}

import {
  getArtboardsOnCurrentPage,
  getSettings,
  showSuccessMessage
} from 'sketch-plugin-helper'

import arrangeOnGrid from './arrange-on-grid'

export default function alignArtboardsToCanvasGrid ({ isAction }) {
  const settings = getSettings()
  const layers = getArtboards(
    settings['alignArtboardsToCanvasGrid.whitelistRegularExpression']
  )
  arrangeOnGrid({
    layers,
    gridWidth: settings['alignArtboardsToCanvasGrid.gridWidth'],
    gridHeight: settings['alignArtboardsToCanvasGrid.gridHeight']
  })
  if (!isAction) {
    showSuccessMessage('Aligned artboards to canvas grid')
  }
}

function getArtboards (whitelistRegularExpression) {
  const artboards = getArtboardsOnCurrentPage()
  if (!whitelistRegularExpression) {
    return artboards
  }
  const regularExpression = new RegExp(whitelistRegularExpression)
  return artboards.filter(function (artboard) {
    return !regularExpression.test(artboard.name)
  })
}

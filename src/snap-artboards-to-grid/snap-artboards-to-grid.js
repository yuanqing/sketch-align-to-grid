import { getArtboardsOnCurrentPage, getSettings, showSuccessMessage } from 'sketch-plugin-helper'

import arrangeOnGrid from './arrange-on-grid'

export default function snapArtboardsToGrid ({ isAction }) {
  const settings = getSettings()
  const layers = getArtboards(
    settings['snapArtboardsToGrid.whitelistRegularExpression']
  )
  arrangeOnGrid({
    layers,
    gridWidth: settings['snapArtboardsToGrid.gridWidth'],
    gridHeight: settings['snapArtboardsToGrid.gridHeight']
  })
  if (!isAction) {
    showSuccessMessage('Snapped artboards to grid')
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

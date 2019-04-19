import { fromNative } from 'sketch'
import { getSettings } from 'sketch-plugin-helper'

import alignLayersToArtboardGrid from './align-layers-to-artboard-grid/align-layers-to-artboard-grid'
import alignArtboardsToCanvasGrid from './align-artboards-to-canvas-grid/align-artboards-to-canvas-grid'

export default function action ({ actionContext }) {
  const settings = getSettings()
  const layers = collectLayersInArtboards(actionContext.layers)
  const hasArtboard = layers.length < actionContext.layers.length
  if (settings['alignLayersToArtboardGrid.snapToGrid'] && layers.length > 0) {
    alignLayersToArtboardGrid({ isAction: true, layers })
  }
  if (settings['alignArtboardsToCanvasGrid.snapToGrid'] && hasArtboard) {
    alignArtboardsToCanvasGrid({ isAction: true })
  }
}

function collectLayersInArtboards (layers) {
  const result = []
  let i = -1
  let layer
  while (++i < layers.length) {
    layer = fromNative(layers[i])
    if (layer.type !== 'Artboard' && layer.getParentArtboard()) {
      result.push(layer)
    }
  }
  return result
}

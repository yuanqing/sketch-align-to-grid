import { fromNative } from 'sketch'
import { getSettings } from 'sketch-plugin-helper'

import snapArtboardsToGrid from './snap-artboards-to-grid/snap-artboards-to-grid'
import snapLayersToGrid from './snap-layers-to-grid/snap-layers-to-grid'

export default function action ({ actionContext }) {
  const settings = getSettings()
  const layers = collectLayersInArtboards(actionContext.layers)
  const hasArtboard = layers.length < actionContext.layers.length
  if (settings['snapArtboardsToGrid.enabled'] && hasArtboard) {
    snapArtboardsToGrid({ isAction: true })
  }
  if (settings['snapLayersToGrid.enabled'] && layers.length > 0) {
    snapLayersToGrid({ isAction: true, layers })
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

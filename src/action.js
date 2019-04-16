import { getSettings } from 'sketch-plugin-helper'

import snapArtboardsToGrid from './snap-artboards-to-grid/snap-artboards-to-grid'

export default function action () {
  const { enabled } = getSettings()
  if (enabled) {
    snapArtboardsToGrid({ isAction: true })
  }
}

import { saveTemporarySettings, getSettings } from 'sketch-plugin-helper'

import snapToGrid from './snap-to-grid'

export default function insertArtboard ({ action }) {
  const { state } = getSettings()
  if (state === 0) {
    // eslint-disable-next-line eqeqeq
    if (action == 'InsertArtboard.finish') {
      saveTemporarySettings({ state: 1 })
    }
    return
  }
  if (state === 1) {
    // eslint-disable-next-line eqeqeq
    if (action == 'HandlerLostFocus') {
      saveTemporarySettings({ state: 2 })
    } else {
      saveTemporarySettings({ state: 0 })
    }
    return
  }
  if (state === 2) {
    // eslint-disable-next-line eqeqeq
    if (action == 'ArtboardChanged.finish') {
      saveTemporarySettings({ state: 0 })
      snapToGrid()
    }
  }
}

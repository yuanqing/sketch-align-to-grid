export default function createGrid ({ layers, gridWidth, gridHeight }) {
  const grid = []
  insertLayersIntoGrid({ grid, layersToInsert: layers, gridWidth, gridHeight })
  adjustYPosition({ grid, gridHeight })
  adjustXPosition({ grid, gridWidth })
  return grid
}

function insertLayersIntoGrid ({
  grid,
  layersToInsert,
  gridWidth,
  gridHeight
}) {
  layersToInsert.forEach(function (layerToInsert) {
    const x = roundDownToNearestMultiple({
      value: layerToInsert.frame.x,
      multiple: gridWidth
    })
    const y = roundDownToNearestMultiple({
      value: layerToInsert.frame.y,
      multiple: gridHeight
    })
    const row = getRow({
      grid,
      y
    })
    row.layers.push({
      x,
      layer: layerToInsert
    })
  })
  sortRowsByXPosition(grid)
}

function getRow ({ grid, y }) {
  const index = grid.reduce(function (result, item, index) {
    if (result !== -1) {
      return result
    }
    if (item.y === y) {
      return index
    }
    return result
  }, -1)
  if (index !== -1) {
    return grid[index]
  }
  const spliceIndex = grid.reduce(function (spliceIndex, item, index) {
    if (y < item.y) {
      return index
    }
    return spliceIndex
  }, grid.length)
  const row = {
    y,
    layers: []
  }
  grid.splice(spliceIndex, 0, row)
  return row
}

function sortRowsByXPosition (grid) {
  grid.forEach(function (row) {
    row.layers.sort(function (a, b) {
      return a.layer.frame.x - b.layer.frame.x
    })
  })
}

// Adjust Y-position based on the height of layers in preceding rows
function adjustYPosition ({ grid, gridHeight }) {
  grid.forEach(function ({ y, layers }, index) {
    let maxHeight = 0
    layers.forEach(function ({ layer }) {
      if (layer.frame.height > maxHeight) {
        maxHeight = layer.frame.height
      }
    })
    const nextIndex = index + 1
    if (nextIndex < grid.length && y + maxHeight >= grid[nextIndex].y) {
      grid.slice(nextIndex).forEach(function (row) {
        row.y = roundDownToNearestMultiple({
          value: row.y + maxHeight,
          multiple: gridHeight
        })
      })
    }
  })
}

// Adjust X-position based on the width of preceding layers in the same row
function adjustXPosition ({ grid, gridWidth }) {
  grid.forEach(function ({ layers }) {
    layers.forEach(function ({ x, layer }, index) {
      const nextIndex = index + 1
      const layerWidth = layer.frame.width
      if (nextIndex < layers.length && x + layerWidth >= layers[nextIndex].x) {
        layers.slice(nextIndex).forEach(function (item) {
          item.x = roundDownToNearestMultiple({
            value: item.x + layerWidth,
            multiple: gridWidth
          })
          if (item.x === x) {
            item.x += gridWidth
          }
        })
      }
    })
  })
}

function roundDownToNearestMultiple ({ value, multiple }) {
  return Math.floor(value / multiple) * multiple
}

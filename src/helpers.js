import {TILE_COUNT, GRID_SIZE} from "./constants"

export function isSolved(tiles) {
  for (let i = 0, l = tiles.length; i < l; i++) {
    if (tiles[i] !== i) {
      return false;
    }
  }
  return true;
}

export function getIndex(row, col) {
  return parseInt(row, 10) * GRID_SIZE + parseInt(col, 10);
}

export function getMatrixPosition(index) {
  return {
    row: Math.floor(index / GRID_SIZE),
    col: index % GRID_SIZE,
  };
}

const getHiddenTileIndex = () => {
  const hiddenTileIndex = Array.from(document.getElementsByClassName('tile')).findIndex(x => x.id === 'lastTile');
  return hiddenTileIndex
}

const getColItems = (colNumber, src, dest) => {
  const hiddenTile = getHiddenTileIndex()
  let swapItems = []
  let items = [...Array(TILE_COUNT).keys()].slice(GRID_SIZE).filter((item, index) => {
    return index = canSwap(item, dest) ? swapItems.push(item) : ''
  })
  if (hiddenTile < src) {
    return swapItems = [...items, hiddenTile, src]
  } else {
    return swapItems = [src, ...items]
  }
}

const getRowItems = (rowNumber, src) => {
  const arr = [...Array(TILE_COUNT).keys()]
  const hiddenTileIndex = getHiddenTileIndex()
  const rowArr = hiddenTileIndex > src ? arr.slice(src).reverse() : arr.slice(hiddenTileIndex)
  return rowArr
}

export function getVisualPosition(row, col, width, height) {
  return {
    x: col * width,
    y: row * height,
  };
}

export function shuffle(tiles) {
  const shuffledTiles = [
    ...tiles
      .filter((t) => t !== tiles.length - 1)
      .sort(() => Math.random() - 0.5),
    tiles.length - 1,
  ];
  return !isSolved(shuffledTiles)
    ? shuffledTiles
    : shuffle(shuffledTiles);
}

export function canSwap(srcIndex, destIndex) {
  const {row: srcRow, col: srcCol} = getMatrixPosition(srcIndex);
  const {row: destRow, col: destCol} = getMatrixPosition(destIndex);
  return Math.abs(srcRow - destRow) === 0 || Math.abs(srcCol - destCol) === 0;
}

export function swap(tiles, src, dest) {
  const tilesResult = [...tiles];
  const {row: srcRow, col: srcCol} = getMatrixPosition(src);
  const {row: destRow, col: destCol} = getMatrixPosition(dest);

  if (Math.abs(srcRow - destRow) === 1 || Math.abs(srcCol - destCol) === 1) {
    [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
  } else if (Math.abs(srcRow - destRow) === 0 && Math.abs(srcRow - destRow) !== 1 && Math.abs(srcCol - destCol) !== 1) {
    let rowItems = getRowItems(srcRow, src)
    if (rowItems[0] > rowItems[1]) {
      rowItems = [...rowItems.slice(rowItems.indexOf(getHiddenTileIndex()))]
    } else if (rowItems[0] < rowItems[1]) {
      rowItems = src + 1 === TILE_COUNT ? rowItems : [...rowItems.splice(0, rowItems.indexOf(src + 1))]
    }
    rowItems.map((item, index) => {
      if (rowItems[0] > rowItems[index]) {
        [tilesResult[item + 1], tilesResult[item]] = [tilesResult[item], tilesResult[item + 1]];
      } else if (rowItems[0] < rowItems[index]) {
        [tilesResult[item - 1], tilesResult[item]] = [tilesResult[item], tilesResult[item - 1]];
      }
    })
  } else if (Math.abs(srcCol - destCol) === 0 && Math.abs(srcRow - destRow) !== 1 && Math.abs(srcCol - destCol) !== 1) {
    let colItems = getColItems(srcCol, src, destCol)
    if (colItems[colItems.indexOf(src)] > getHiddenTileIndex()) {
      colItems = [...colItems].filter((value, index, array) => array.indexOf(value) === index);
      colItems.map((item, index) => {
        if (index !== colItems.length - 1) {
          [tilesResult[colItems[index + 1]], tilesResult[colItems[index]]] = [tilesResult[colItems[index]], tilesResult[colItems[index + 1]]];
        }
      })
    } else if (colItems[colItems.indexOf(src)] < colItems[colItems.indexOf(getHiddenTileIndex())]) {
      colItems.reverse()
      colItems.map((item, index) => {
        if (index !== colItems.length - 1) {
          [tilesResult[colItems[index + 1]], tilesResult[colItems[index]]] = [tilesResult[colItems[index]], tilesResult[colItems[index + 1]]];
        }
      })
    }
  }
  return tilesResult;
}

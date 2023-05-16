import React, { useState } from "react";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_WIDTH, BOARD_HEIGHT } from "./constants"
import { canSwap, shuffle, swap, isSolved } from "./helpers"

function Board() {
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
  const [isStarted, setIsStarted] = useState(false);

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles)
    setTiles(shuffledTiles);
  }

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1), tiles)) {
      const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
      setTiles(swappedTiles)
    }
  }

  const handleTileClick = (index) => {
    swapTiles(index)
  }

  const handleShuffleClick = () => {
    shuffleTiles()
  }

  const handleStartClick = () => {
    shuffleTiles()
    setIsStarted(true)
  }

  const pieceWidth = Math.round(BOARD_WIDTH / GRID_SIZE);
  const pieceHeight = Math.round(BOARD_HEIGHT / GRID_SIZE);
  const style = {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
  };
  const hasWon = isSolved(tiles)

  return (
    <>
      <ul style={style} className="board">
        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            tile={tile}
            width={pieceWidth}
            height={pieceHeight}
            handleTileClick={handleTileClick}
          />
        ))}
      </ul>
      {hasWon && isStarted && <div>Pusslet är löst 🎉🎉</div>}
      {!isStarted ?
        (<button onClick={() => handleStartClick()}>Starta</button>) :
        (<button onClick={() => handleShuffleClick()}>Blanda</button>)}
    </>
  );
}

export default Board;

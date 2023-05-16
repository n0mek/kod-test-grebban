import React from "react";
import { Motion, spring } from "react-motion";
import { getMatrixPosition, getVisualPosition } from "./helpers";
import { TILE_COUNT, GRID_SIZE, BOARD_WIDTH, BOARD_HEIGHT } from "./constants"

function Tile(props) {
  const { tile, index, width, height, handleTileClick} = props;
  const { row, col } = getMatrixPosition(index);
  const visualPos = getVisualPosition(row, col, width, height);
  const tileStyle = {
    width: `calc(100% / ${GRID_SIZE})`,
    height: `calc(100% / ${GRID_SIZE})`,
    translateX: visualPos.x,
    translateY: visualPos.y,
  };
  const motionStyle = {
    translateX: spring(visualPos.x),
    translateY: spring(visualPos.y)
  }

  return (
    <Motion style={motionStyle}>
      {({ translateX, translateY }) => (
        <li
          style={{
            ...tileStyle,
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            opacity: tile === TILE_COUNT - 1 ? 0 : 1,
          }}
          className="tile"
          id={`${tile === TILE_COUNT - 1 ? 'lastTile' : ''}`}
          onClick={() => handleTileClick(index)}
        >
          {`${tile + 1}`}
        </li>
      )}
    </Motion>
  );
}

export default Tile;

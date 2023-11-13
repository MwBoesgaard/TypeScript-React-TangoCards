import { useState } from 'react';
import { back } from '../Cards';
import { TileProps } from '../props/TileProps';
import { TileState } from '../types/TileState';

export const Tile = ({
  states,
  setStates,
  setMoveCounter,
  index,
}: TileProps) => {
  const state: TileState = states.find((tile: TileState) => tile.id === index);
  const [fadeOutTimer, setFadeOutTimer] = useState(null);

  const flip = () => {
    const flippedTile: TileState = { ...state, revealed: !state.revealed };
    const tiles: TileState[] = states.map((x) =>
      x.id === flippedTile.id ? flippedTile : x
    );

    let finalState: TileState[] = tiles;
    if (moreThanTwoRevealed(tiles)) {
      clearTimeout(fadeOutTimer);
      finalState = hideUnmatchedTiles(tiles, flippedTile);
    } else if (twoMatchText(tiles, flippedTile.text)) {
      finalState = updateMatchedTiles(tiles, flippedTile);
    }

    if (exactlyTwoRevealed(tiles)) {
      setMoveCounter((prev: number) => prev + 1);
      const revealedToHide = finalState.filter((tile) => tile.revealed);
      const timeoutId: number = setTimeout(
        hideUnmatchedTilesTimeout,
        1000,
        revealedToHide
      );
      setFadeOutTimer(timeoutId);
    }

    setStates(finalState);
  };

  const hideUnmatchedTilesTimeout = (tilesToHide: TileState[]) => {
    const idsToHide: number[] = tilesToHide.map((tile) => tile.id);
    setStates((prev: TileState[]) =>
      prev.map((tile: TileState) => {
        if (idsToHide.includes(tile.id)) {
          return { ...tile, revealed: false };
        } else {
          return tile;
        }
      })
    );
  };

  return (
    <div className="tile">
      <div className={`innerTile ${state.revealed && 'active'}`}>
        <div
          id={state.matched && 'matchedBack'}
          className="back"
          onClick={flip}
        >
          {back}
        </div>
        <div id={state.matched && 'matchedTile'} className="front">
          {state.text}
        </div>
      </div>
    </div>
  );
};

const hideUnmatchedTiles = (
  tiles: TileState[],
  flippedTile: TileState
): TileState[] => {
  return tiles.map((x) => {
    if (x.matched || x.id === flippedTile.id) {
      return x;
    }
    return { ...x, revealed: false };
  });
};

const updateMatchedTiles = (
  tiles: TileState[],
  flippedTile: TileState
): TileState[] => {
  return tiles.map((x) => {
    if (x.text !== flippedTile.text) {
      return x;
    }
    return { ...x, matched: true };
  });
};

const moreThanTwoRevealed = (states: TileState[]): boolean => {
  return states.filter((x) => !x.matched && x.revealed).length > 2;
};

const exactlyTwoRevealed = (states: TileState[]): boolean => {
  return states.filter((x) => !x.matched && x.revealed).length === 2;
};

const twoMatchText = (states: TileState[], text: string): boolean => {
  return (
    states.filter((x) => !x.matched && x.revealed && x.text === text).length >=
    2
  );
};

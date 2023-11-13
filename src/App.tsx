import { useEffect, useState } from 'react';
import { spades } from './Cards';

import './style.css';
import DoneView from './component/DoneView';
import PlayingView from './component/PlayingView';
import { TileState } from './types/TileState';

const tileTextOptions: string[] = spades.slice(1);

export const App = (): JSX.Element => {
  const [states, setStates] = useState<TileState[]>(initTiles(tileTextOptions));
  const [moveCounter, setMoveCounter] = useState<number>(0);
  const [moveBest, setMoveBest] = useState<number | null>(null);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    if (allTilesMatched(states)) {
      setTimeout(() => {
        setDone(true);
      }, 1500);
    }
  }, [states]);

  return done ? (
    <DoneView
      setStates={setStates}
      moveCounter={moveCounter}
      setMoveCounter={setMoveCounter}
      moveBest={moveBest}
      setMoveBest={setMoveBest}
      initTiles={initTiles}
      tileTextOptions={tileTextOptions}
      setDone={setDone}
    />
  ) : (
    <PlayingView
      states={states}
      setStates={setStates}
      moveCounter={moveCounter}
      setMoveCounter={setMoveCounter}
    />
  );
};

const allTilesMatched = (tiles: TileState[]): Boolean => {
  return tiles.filter((tile) => !tile.matched).length === 0;
};

const initTiles = (options: string[]): TileState[] => {
  const doubledOptions: string[] = options.concat(options);
  const randOptions: string[] = [];

  const randSeries: number[] = generateRandomSeries(options.length * 2);

  doubledOptions.forEach((_) => {
    const randNum: number = randSeries.pop();
    randOptions.push(doubledOptions[randNum]);
  });

  const randTiles: TileState[] = randOptions.map((text, index) => {
    return { id: index, text: text, revealed: false, matched: false };
  });

  return randTiles;
};

const generateRandomSeries = (size: number): number[] => {
  const numbers: number[] = Array.from({ length: size }, (_, index) => index);
  numbers.sort(() => 0.5 - Math.random());
  return numbers;
};

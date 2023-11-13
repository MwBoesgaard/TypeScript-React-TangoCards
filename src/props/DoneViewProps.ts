import { Dispatch, SetStateAction } from 'react';
import { TileState } from '../types/TileState';

export type DoneViewProps = {
  setStates: Dispatch<SetStateAction<TileState[]>>;
  moveCounter: number;
  setMoveCounter: Dispatch<SetStateAction<number>>;
  moveBest: number;
  setMoveBest: Dispatch<SetStateAction<number>>;
  initTiles: (options: string[]) => TileState[];
  tileTextOptions: string[];
  setDone: Dispatch<SetStateAction<boolean>>;
};

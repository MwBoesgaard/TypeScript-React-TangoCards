import { Dispatch, SetStateAction } from 'react';
import { TileState } from '../types/TileState';

export type TileProps = {
  states: TileState[];
  setStates: Dispatch<SetStateAction<TileState[]>>;
  setMoveCounter: Dispatch<SetStateAction<number>>;
  index: number;
};

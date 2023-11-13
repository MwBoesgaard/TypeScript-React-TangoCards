import { Tile } from './Tile';

const PlayingView = ({
  states,
  setStates,
  moveCounter,
  setMoveCounter,
}): JSX.Element => (
  <div id="game">
    <h1 id="gameTitle">💃Tango Cards🕺</h1>
    <p id="gameSubtitle">~It Takes Two~</p>
    <div id="tileBoard">
      {states.map((_, index) => (
        <Tile
          states={states}
          setStates={setStates}
          setMoveCounter={setMoveCounter}
          index={index}
          key={index}
        />
      ))}
    </div>
    <h1 id="moveCounter">Moves: {moveCounter}</h1>
  </div>
);
export default PlayingView;

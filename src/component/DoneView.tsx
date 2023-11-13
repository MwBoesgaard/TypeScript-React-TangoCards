import { useCallback } from 'react';
import { DoneViewProps } from '../props/DoneViewProps';

const DoneView = ({
  setStates,
  moveCounter,
  setMoveCounter,
  moveBest,
  setMoveBest,
  initTiles,
  tileTextOptions,
  setDone,
}: DoneViewProps): JSX.Element => {
  const resetGame = useCallback(() => {
    console.log(`moveCounter: ${moveCounter}, moveBest: ${moveBest}`);
    if (moveBest === null || moveCounter < moveBest) {
      localStorage.setItem('memoryGameBestScore', moveCounter.toString());
    }

    const bestScore = localStorage.getItem('memoryGameBestScore');
    setMoveCounter(0);
    setMoveBest(Number.parseInt(bestScore));
    setStates(initTiles(tileTextOptions));
    setDone(false);
  }, []);

  return (
    <div id="doneView">
      <p className="gameOverTitle">Well done!</p>
      <p className="gameOverSubtitle">Think you can do it in fewer moves?</p>
      <div className="moves">
        <p>
          <span>Moves:</span>
          <span>{moveCounter}</span>{' '}
        </p>
        <p>
          <span>Record:</span>
          <span>{moveBest === null ? '-' : moveBest}</span>
        </p>
      </div>

      <button id="resetButton" onClick={resetGame}>
        Play again!
      </button>
    </div>
  );
};
export default DoneView;

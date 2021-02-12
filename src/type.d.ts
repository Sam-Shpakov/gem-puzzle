interface IGame {
  img: string;
  moves: number;
  movesSolution: number;
  size: number;
  shuffling: boolean;
  timeGame: number;
  isSound: boolean;
  isGame: boolean;
  solutionPath: string[];
  isSolution: boolean;
  boardState: number[][];
  solvedBoard: number[][];
  isRules: boolean;
  isScores: boolean;
  scoresBest: Scores[];
}

type Scores = {
  time: number;
  moves: number;
};

type GameState = {
  games: IGame[];
};

type GameAction = {
  type: string;
  payload: IGame;
};

type DispatchType = (args: GameAction) => GameAction;

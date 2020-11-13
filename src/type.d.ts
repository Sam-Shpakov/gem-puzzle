interface IGame {
  moves: number;
  size: number;
  shuffling: boolean;
  timeGame: string;
  solutionPath: string[];
  boardState: number[][];
  solvedBoard: number[][];
}

type GameState = {
  games: IGame[];
};

type GameAction = {
  type: string;
  payload: IGame;
};

type DispatchType = (args: GameAction) => GameAction;

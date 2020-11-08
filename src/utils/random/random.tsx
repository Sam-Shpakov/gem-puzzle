export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const NUM_ROWS = 4;
const NUM_COLS = 4;
const NUM_TILES = NUM_ROWS * NUM_COLS;

export function getNewBoard() {
  return Array(NUM_TILES)
    .fill(0)
    .map((x, index) => [Math.floor(index / NUM_ROWS), index % NUM_COLS]);
}

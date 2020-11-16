export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getNewBoard(num_rows, num_cols) {
  return Array(num_rows * num_cols)
    .fill(0)
    .map((x, index) => [Math.floor(index / num_rows), index % num_cols]);
}
export function getRandomPoints() {
  return Math.floor(Math.random() * 6) + 1;
}

export function computePointsOfOneKind(
  pointsOfDice: number[],
  kind: number,
): number {
  return pointsOfDice.reduce((acc, curr) => {
    return acc + (curr === kind ? kind : 0);
  });
}

export function computeThreeOfAKind(pointsOfDice: number[]): number {
  return getPointsCount(pointsOfDice).findIndex((p) => p >= 3) === -1
    ? 0
    : pointsOfDice.reduce((acc, curr) => acc + curr);
}

export function computeFourOfAKind(pointsOfDice: number[]): number {
  return getPointsCount(pointsOfDice).findIndex((p) => p >= 4) === -1
    ? 0
    : pointsOfDice.reduce((acc, curr) => acc + curr);
}

export function computeFullHouse(pointsOfDice: number[]): number {
  return getPointsCount(pointsOfDice).some((p) => p === 3) &&
    getPointsCount(pointsOfDice).some((p) => p === 2)
    ? 25
    : 0;
}

export function computeSmallStraight(pointsOfDice: number[]): number {
  const count = getPointsCount(pointsOfDice);

  return (count[1] >= 1 && count[2] >= 1 && count[3] >= 1 && count[4] >= 1) ||
    (count[2] >= 1 && count[3] >= 1 && count[4] >= 1 && count[5] >= 1) ||
    (count[3] >= 1 && count[4] >= 1 && count[5] >= 1 && count[6] >= 1)
    ? 30
    : 0;
}

export function computeLargeStraight(pointsOfDice: number[]): number {
  const count = getPointsCount(pointsOfDice);

  return (count[1] >= 1 &&
    count[2] >= 1 &&
    count[3] >= 1 &&
    count[4] >= 1 &&
    count[5] >= 1) ||
    (count[2] >= 1 &&
      count[3] >= 1 &&
      count[4] >= 1 &&
      count[5] >= 1 &&
      count[6] >= 1)
    ? 40
    : 0;
}

export function computeJackpot(pointsOfDice: number[]): number {
  return getPointsCount(pointsOfDice).some((p) => p === 5) ? 50 : 0;
}

export function computeChance(pointsOfDice: number[]): number {
  return pointsOfDice.reduce((acc, curr) => acc + curr);
}

export function getPointsCount(points: number[]) {
  return points.reduce(
    (acc, currentValue) => {
      acc[currentValue] = acc[currentValue] + 1;
      return acc;
    },
    [0, 0, 0, 0, 0, 0, 0],
  );
}

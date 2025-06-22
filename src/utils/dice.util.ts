export function getRandomPoints() {
  return Math.floor(Math.random() * 6) + 1;
}

export function computePointsOfOneKind(
  pointsOfDices: number[],
  kind: number,
): number {
  return pointsOfDices.reduce((acc, curr) => {
    return acc + (curr === kind ? kind : 0);
  });
}

export function computeThreeOfAKind(pointsOfDices: number[]): number {
  return getPointsCount(pointsOfDices).findIndex((p) => p >= 3) === -1
    ? 0
    : pointsOfDices.reduce((acc, curr) => acc + curr);
}

export function computeFourOfAKind(pointsOfDices: number[]): number {
  return getPointsCount(pointsOfDices).findIndex((p) => p >= 4) === -1
    ? 0
    : pointsOfDices.reduce((acc, curr) => acc + curr);
}

export function computeFullHouse(pointsOfDices: number[]): number {
  return getPointsCount(pointsOfDices).some((p) => p === 3) &&
    getPointsCount(pointsOfDices).some((p) => p === 2)
    ? 25
    : 0;
}

export function computeSmallStraight(pointsOfDices: number[]): number {
  const count = getPointsCount(pointsOfDices);

  return (count[1] >= 1 && count[2] >= 1 && count[3] >= 1 && count[4] >= 1) ||
    (count[2] >= 1 && count[3] >= 1 && count[4] >= 1 && count[5] >= 1) ||
    (count[3] >= 1 && count[4] >= 1 && count[5] >= 1 && count[6] >= 1)
    ? 30
    : 0;
}

export function computeLargeStraight(pointsOfDices: number[]): number {
  const count = getPointsCount(pointsOfDices);

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

export function computeJackpot(pointsOfDices: number[]): number {
  return getPointsCount(pointsOfDices).some((p) => p === 5) ? 50 : 0;
}

export function computeChance(pointsOfDices: number[]): number {
  return pointsOfDices.reduce((acc, curr) => acc + curr);
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

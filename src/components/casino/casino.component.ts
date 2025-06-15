import { Component, computed, signal } from '@angular/core';
import { CubeComponent } from '../cube/cube.component';

export type DiceResult = {
  diceNumber: number | undefined;
  points: number | undefined | null;
};

@Component({
  selector: 'app-casino',
  imports: [CubeComponent],
  templateUrl: './casino.component.html',
  styleUrl: './casino.component.scss',
})
export class CasinoComponent {
  cube1 = signal<number>(6);
  cube2 = signal<number>(6);
  cube3 = signal<number>(6);
  cube4 = signal<number>(6);
  cube5 = signal<number>(6);

  allDice = computed(() => [
    0,
    this.cube1(),
    this.cube2(),
    this.cube3(),
    this.cube4(),
    this.cube5(),
  ]);

  ones = computed(() =>
    this.allDice().reduce((acc, curr) => {
      return acc + (curr === 1 ? 1 : 0);
    }, 0),
  );

  twos = computed(() =>
    this.allDice().reduce((acc, curr) => {
      return acc + (curr === 2 ? 2 : 0);
    }, 0),
  );

  threes = computed(() =>
    this.allDice().reduce((acc, curr) => {
      return acc + (curr === 3 ? 3 : 0);
    }, 0),
  );

  fours = computed(() =>
    this.allDice().reduce((acc, curr) => {
      return acc + (curr === 4 ? 4 : 0);
    }, 0),
  );

  fives = computed(() =>
    this.allDice().reduce((acc, curr) => {
      return acc + (curr === 5 ? 5 : 0);
    }, 0),
  );

  sixes = computed(() =>
    this.allDice().reduce((acc, curr) => {
      return acc + (curr === 6 ? 6 : 0);
    }, 0),
  );

  // Todo hier noch die anderen

  threeOfAKind = computed(() =>
    getPointsCount(this.allDice()).findIndex((p) => p >= 3) === -1
      ? 0
      : this.allDice().reduce((acc, curr) => acc + curr),
  );

  fourOfAKind = computed(() =>
    getPointsCount(this.allDice()).findIndex((p) => p >= 4) === -1
      ? 0
      : this.allDice().reduce((acc, curr) => acc + curr),
  );

  fullHouse = computed(() =>
    getPointsCount(this.allDice()).some((p) => p === 3) &&
    getPointsCount(this.allDice()).some((p) => p === 2)
      ? 25
      : 0,
  );

  smallStraight = computed(() => {
    const count = getPointsCount(this.allDice());

    return (count[1] >= 1 && count[2] >= 1 && count[3] >= 1 && count[4] >= 1) ||
      (count[2] >= 1 && count[3] >= 1 && count[4] >= 1 && count[5] >= 1) ||
      (count[3] >= 1 && count[4] >= 1 && count[5] >= 1 && count[6] >= 1)
      ? 30
      : 0;
  });

  largeStraight = computed(() => {
    const count = getPointsCount(this.allDice());

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
  });

  jackpot = computed(() =>
    getPointsCount(this.allDice()).some((p) => p === 5) ? 50 : 0,
  );

  chance = computed(() => this.allDice().reduce((acc, curr) => acc + curr));

  onDiceChange(result: DiceResult | null) {
    if (result?.points) {
      switch (result.diceNumber) {
        case 1:
          this.cube1.set(result?.points);
          break;
        case 2:
          this.cube2.set(result?.points);
          break;
        case 3:
          this.cube3.set(result?.points);
          break;
        case 4:
          this.cube4.set(result?.points);
          break;
        case 5:
          this.cube5.set(result?.points);
          break;
      }
    }
  }

  onRandomize() {
    this.cube1.set(getRandomAugen());
    this.cube2.set(getRandomAugen());
    this.cube3.set(getRandomAugen());
    this.cube4.set(getRandomAugen());
    this.cube5.set(getRandomAugen());
  }
}

function getRandomAugen() {
  return Math.floor(Math.random() * 6) + 1;
}

function getPointsCount(points: number[]) {
  return points.reduce(
    (acc, currentValue) => {
      acc[currentValue] = acc[currentValue] + 1;
      return acc;
    },
    [0, 0, 0, 0, 0, 0, 0],
  );
}

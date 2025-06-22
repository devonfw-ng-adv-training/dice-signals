import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { CubeComponent } from '../cube/cube.component';
import {
  computeChance,
  computeFourOfAKind,
  computeFullHouse,
  computeJackpot,
  computeLargeStraight,
  computePointsOfOneKind,
  computeSmallStraight,
  computeThreeOfAKind,
} from '../../utils/dice.util';

export type DiceResult = {
  diceNumber: number | undefined;
  points: number | undefined | null;
};

@Component({
  selector: 'app-casino',
  imports: [CubeComponent],
  templateUrl: './casino.component.html',
  styleUrl: './casino.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasinoComponent {
  throwNo = signal<number>(0);

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

  ones = computed(() => computePointsOfOneKind(this.allDice(), 1));
  twos = computed(() => computePointsOfOneKind(this.allDice(), 2));
  threes = computed(() => computePointsOfOneKind(this.allDice(), 3));
  fours = computed(() => computePointsOfOneKind(this.allDice(), 4));
  fives = computed(() => computePointsOfOneKind(this.allDice(), 5));
  sixes = computed(() => computePointsOfOneKind(this.allDice(), 6));

  threeOfAKind = computed(() => computeThreeOfAKind(this.allDice()));
  fourOfAKind = computed(() => computeFourOfAKind(this.allDice()));
  fullHouse = computed(() => computeFullHouse(this.allDice()));
  smallStraight = computed(() => computeSmallStraight(this.allDice()));
  largeStraight = computed(() => computeLargeStraight(this.allDice()));
  jackpot = computed(() => computeJackpot(this.allDice()));
  chance = computed(() => computeChance(this.allDice()));

  onCubeChange(result: DiceResult | null) {
    if (result?.points) {
      switch (result.diceNumber) {
        case 1:
          this.cube1.set(result.points);
          break;
        case 2:
          this.cube2.set(result.points);
          break;
        case 3:
          this.cube3.set(result.points);
          break;
        case 4:
          this.cube4.set(result.points);
          break;
        case 5:
          this.cube5.set(result.points);
          break;
      }
    }
  }

  onRollTheDice() {
    this.throwNo.update((no) => no + 1);
  }
}

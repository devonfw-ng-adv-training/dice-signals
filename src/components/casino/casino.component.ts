import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
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

export type CubeResult = {
  cubeNumber: number | undefined;
  points: number | undefined | null;
};

@Component({
  selector: 'app-casino',
  imports: [CubeComponent, AsyncPipe],
  templateUrl: './casino.component.html',
  styleUrl: './casino.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasinoComponent implements OnInit {
  throwNo$ = new BehaviorSubject<number>(0);

  dice1$ = new BehaviorSubject<number>(6);
  dice2$ = new BehaviorSubject<number>(6);
  dice3$ = new BehaviorSubject<number>(6);
  dice4$ = new BehaviorSubject<number>(6);
  dice5$ = new BehaviorSubject<number>(6);

  ones$: Observable<number> | undefined;
  twos$: Observable<number> | undefined;
  threes$: Observable<number> | undefined;
  fours$: Observable<number> | undefined;
  fives$: Observable<number> | undefined;
  sixes$: Observable<number> | undefined;
  threeOfAKind$: Observable<number> | undefined;
  fourOfAKind$: Observable<number> | undefined;
  fullHouse$: Observable<number> | undefined;
  smallStraight$: Observable<number> | undefined;
  largeStraight$: Observable<number> | undefined;
  jackpot$: Observable<number> | undefined;
  chance$: Observable<number> | undefined;

  ngOnInit() {
    const alldDice$ = combineLatest([
      of(0),
      this.dice1$,
      this.dice2$,
      this.dice3$,
      this.dice4$,
      this.dice5$,
    ]);

    this.ones$ = alldDice$.pipe(
      map((points) => computePointsOfOneKind(points, 1)),
    );
    this.twos$ = alldDice$.pipe(
      map((points) => computePointsOfOneKind(points, 2)),
    );
    this.threes$ = alldDice$.pipe(
      map((points) => computePointsOfOneKind(points, 3)),
    );
    this.fours$ = alldDice$.pipe(
      map((points) => computePointsOfOneKind(points, 4)),
    );
    this.fives$ = alldDice$.pipe(
      map((points) => computePointsOfOneKind(points, 5)),
    );
    this.sixes$ = alldDice$.pipe(
      map((points) => computePointsOfOneKind(points, 6)),
    );

    this.threeOfAKind$ = alldDice$.pipe(
      map((points) => computeThreeOfAKind(points)),
    );
    this.fourOfAKind$ = alldDice$.pipe(
      map((points) => computeFourOfAKind(points)),
    );
    this.fullHouse$ = alldDice$.pipe(map((points) => computeFullHouse(points)));
    this.smallStraight$ = alldDice$.pipe(
      map((points) => computeSmallStraight(points)),
    );
    this.largeStraight$ = alldDice$.pipe(
      map((points) => computeLargeStraight(points)),
    );
    this.jackpot$ = alldDice$.pipe(map((points) => computeJackpot(points)));
    this.chance$ = alldDice$.pipe(map((points) => computeChance(points)));
  }

  onCubeChange(result: CubeResult | null) {
    if (result?.points) {
      switch (result.cubeNumber) {
        case 1:
          this.dice1$.next(result.points);
          break;
        case 2:
          this.dice2$.next(result.points);
          break;
        case 3:
          this.dice3$.next(result.points);
          break;
        case 4:
          this.dice4$.next(result.points);
          break;
        case 5:
          this.dice5$.next(result.points);
          break;
      }
    }
  }

  onRollTheDice() {
    this.throwNo$.next(this.throwNo$.value + 1);
  }
}

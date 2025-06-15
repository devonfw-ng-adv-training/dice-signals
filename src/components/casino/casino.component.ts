import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CubeComponent } from '../cube/cube.component';

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
      this.dice1$,
      this.dice2$,
      this.dice3$,
      this.dice4$,
      this.dice5$,
    ]);

    this.ones$ = alldDice$.pipe(
      map((points) =>
        points.reduce((acc, curr) => {
          return acc + (curr === 1 ? 1 : 0);
        }, 0),
      ),
    );

    this.twos$ = alldDice$.pipe(
      map((points) =>
        points.reduce((acc, curr) => {
          return acc + (curr === 2 ? 2 : 0);
        }, 0),
      ),
    );

    this.threes$ = alldDice$.pipe(
      map((points) =>
        points.reduce((acc, curr) => {
          return acc + (curr === 3 ? 3 : 0);
        }, 0),
      ),
    );

    this.fours$ = alldDice$.pipe(
      map((points) =>
        points.reduce((acc, curr) => {
          return acc + (curr === 4 ? 4 : 0);
        }, 0),
      ),
    );

    this.fives$ = alldDice$.pipe(
      map((points) =>
        points.reduce((acc, curr) => {
          return acc + (curr === 5 ? 5 : 0);
        }, 0),
      ),
    );

    this.sixes$ = alldDice$.pipe(
      map((points) =>
        points.reduce((acc, curr) => {
          return acc + (curr === 6 ? 6 : 0);
        }, 0),
      ),
    );

    this.threeOfAKind$ = alldDice$.pipe(
      map((points) => {
        return getPointsCount(points).findIndex((p) => p >= 3) === -1
          ? 0
          : points.reduce((acc, curr) => acc + curr);
      }),
    );

    this.fourOfAKind$ = alldDice$.pipe(
      map((points) => {
        return getPointsCount(points).findIndex((p) => p >= 4) === -1
          ? 0
          : points.reduce((acc, curr) => acc + curr);
      }),
    );

    this.fullHouse$ = alldDice$.pipe(
      map((points) => {
        return getPointsCount(points).some((p) => p === 3) &&
          getPointsCount(points).some((p) => p === 2)
          ? 25
          : 0;
      }),
    );

    this.smallStraight$ = alldDice$.pipe(
      map((points) => {
        const count = getPointsCount(points);

        return (count[1] >= 1 &&
          count[2] >= 1 &&
          count[3] >= 1 &&
          count[4] >= 1) ||
          (count[2] >= 1 && count[3] >= 1 && count[4] >= 1 && count[5] >= 1) ||
          (count[3] >= 1 && count[4] >= 1 && count[5] >= 1 && count[6] >= 1)
          ? 30
          : 0;
      }),
    );

    this.largeStraight$ = alldDice$.pipe(
      map((points) => {
        const count = getPointsCount(points);

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
      }),
    );

    this.jackpot$ = alldDice$.pipe(
      map((points) => {
        return getPointsCount(points).some((p) => p === 5) ? 50 : 0;
      }),
    );

    this.chance$ = alldDice$.pipe(
      map((points) => {
        return points.reduce((acc, curr) => acc + curr);
      }),
    );
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

  onRandomize() {
    this.dice1$.next(getRandomPoints());
    this.dice2$.next(getRandomPoints());
    this.dice3$.next(getRandomPoints());
    this.dice4$.next(getRandomPoints());
    this.dice5$.next(getRandomPoints());
  }
}

function getRandomPoints() {
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

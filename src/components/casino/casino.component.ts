import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
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
  throwNo$ = new BehaviorSubject<number>(0);

  dice1$ = new BehaviorSubject<number>(6);
  dice2$ = new BehaviorSubject<number>(6);
  dice3$ = new BehaviorSubject<number>(6);
  dice4$ = new BehaviorSubject<number>(6);
  dice5$ = new BehaviorSubject<number>(6);

  // Todo Define observables here to handle categories "ones", "twos",...

  ngOnInit() {
    // Todo Set the calculations for the above defined observables here
    // You can use the dice.util.ts utility to calculate the actual results for the categories
    // or try to write your own computation.
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

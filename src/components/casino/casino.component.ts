import { ChangeDetectionStrategy, Component } from '@angular/core';

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
export class CasinoComponent {
  throwNo$ = new BehaviorSubject<number>(0);

  dice1$ = new BehaviorSubject<number>(6);
  dice2$ = new BehaviorSubject<number>(6);
  dice3$ = new BehaviorSubject<number>(6);
  dice4$ = new BehaviorSubject<number>(6);
  dice5$ = new BehaviorSubject<number>(6);

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

import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DiceResult } from '../casino/casino.component';
import { getRandomPoints } from '../../utils/dice.util';

@Component({
  selector: 'app-cube',
  imports: [FormsModule],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CubeComponent {
  cubeNumber = input<number>();
  throwNo = input<number>();

  currentPoints = signal(6);
  iconUrl: string = 'assets/icons/6.svg';

  cubeChangeOutput = output<DiceResult | null>();

  options = [
    { points: 1, label: 'One' },
    { points: 2, label: 'Two' },
    { points: 3, label: 'Three' },
    { points: 4, label: 'Four' },
    { points: 5, label: 'Five' },
    { points: 6, label: 'Six' },
  ];

  constructor() {
    effect(() => {
      const throwNo = this.throwNo();

      if (throwNo) {
        const points = getRandomPoints();

        this.currentPoints.set(points);
      }
    });

    effect(() => {
      const currentPoints = this.currentPoints();
      this.iconUrl = `assets/icons/${currentPoints}.svg`;

      this.cubeChangeOutput.emit({
        diceNumber: this.cubeNumber(),
        points: Number(currentPoints),
      });
    });
  }
}

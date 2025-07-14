import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasinoComponent {
  throwNo = signal<number>(0);

  cube1 = signal<number>(6);
  cube2 = signal<number>(6);
  cube3 = signal<number>(6);
  cube4 = signal<number>(6);
  cube5 = signal<number>(6);

  // Todo Use signals to compute the result table here using the values of the cube signals above.

  /* ones =
     twos =
  */

  // You can use the dice.util.ts utility to calculate the actual results for the categories (Ones, Twos, Full House, etc..)
  // or try to write your own computation.

  // Display the computed values in the table that is prepared in the template.

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

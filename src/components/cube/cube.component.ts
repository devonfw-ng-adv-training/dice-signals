import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { DiceResult } from '../casino/casino.component';
//import { getRandomPoints } from '../../utils/dice.util';

@Component({
  selector: 'app-cube',
  imports: [FormsModule],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CubeComponent {
  // Todo Create two input signals here to get values "cubeNumber" and "throwNo"

  iconUrl: string = 'assets/icons/6.svg';

  // Todo Create a signal here to store "currentPoints"

  // Todo Create an output here that will send an event to the parent when the cube points change

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
      // Todo Create an effect here that acts on change of throw no. It should set the cube to new random points.
    });

    effect(() => {
      // Todo Create an effect here that acts on change of current points. It should change the icon respectively and emit an output.
    });
  }
}

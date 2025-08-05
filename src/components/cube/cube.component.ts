import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cube',
  imports: [FormsModule],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CubeComponent {
  // Todo Create an input (@Input()) for cubeNumber here

  // Todo Create an input (@Input()) for throwNo here with setter: on new value generate new points using getRandomPoints() and call onSelectionChange()

  // Todo Crate a new output (OutputEmitter with @Output()) here that will send an event to the parent when the cube points change

  // Todo create a BehaviorSubject here to handle the current points

  iconUrl: string = 'assets/icons/6.svg';

  options = [
    { points: 1, label: 'One' },
    { points: 2, label: 'Two' },
    { points: 3, label: 'Three' },
    { points: 4, label: 'Four' },
    { points: 5, label: 'Five' },
    { points: 6, label: 'Six' },
  ];

  onSelectionChange(points: number) {
    // Todo Set subject holding current points to new value here
    // Todo Update the iconurl here
    // Todo Emit the new value with the output emitter defined above
  }
}

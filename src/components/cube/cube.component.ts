import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  OnInit,
  output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DiceResult } from '../casino/casino.component';

@Component({
  selector: 'app-cube',
  imports: [ReactiveFormsModule],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CubeComponent implements OnInit {
  cubeNumber = input<number>();
  points = input<number | null>(null);

  currentPoints: number | null = 0;
  iconUrl: string = 'assets/icons/6.svg';

  cubeChangeOutput = output<DiceResult | null>();

  // Form with select-box
  select = new FormControl<number>(6, Validators.required);
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
      const points = this.points();
      this.select.setValue(points);

      this.iconUrl = `assets/icons/${points}.svg`;
    });
  }

  ngOnInit() {
    this.currentPoints = this.points();
  }

  onSelectionChange() {
    this.currentPoints = this.select.value;

    this.cubeChangeOutput.emit({
      diceNumber: this.cubeNumber(),
      points: Number(this.currentPoints),
    });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DiceResult } from '../casino/casino.component';

@Component({
  selector: 'app-dice',
  imports: [ReactiveFormsModule],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiceComponent implements OnInit {
  @Input() diceNumber: number | undefined;
  @Input() points: number | null | undefined;

  @Output() diceChangeOutput = new EventEmitter<DiceResult | null>();

  currentPoints: number | null = 0;
  iconUrl: string = 'assets/icons/6.svg';

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
      if (this.points) {
        this.select.setValue(this.points);

        this.iconUrl = `assets/icons/${this.points}.svg`;
      }
    });
  }

  ngOnInit() {}

  onSelectionChange() {
    this.currentPoints = this.select.value;

    this.diceChangeOutput.emit({
      diceNumber: this.diceNumber,
      points: Number(this.points),
    });
  }
}

import { Component, effect, input, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DiceResult } from '../casino/casino.component';

@Component({
  selector: 'app-dice',
  imports: [ReactiveFormsModule],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss',
})
export class DiceComponent implements OnInit {
  diceNumber = input<number>();
  points = input<number | null>(null);

  currentPoints: number | null = 0;
  iconUrl: string = 'assets/icons/6.svg';

  diceChangeOutput = output<DiceResult | null>();

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

    this.diceChangeOutput.emit({
      diceNumber: this.diceNumber(),
      points: Number(this.currentPoints),
    });
  }
}

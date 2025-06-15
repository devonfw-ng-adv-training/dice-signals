import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CubeResult } from '../casino/casino.component';

@Component({
  selector: 'app-cube',
  imports: [ReactiveFormsModule],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CubeComponent implements OnChanges {
  @Input() cubeNumber: number | undefined;
  @Input() points: number | null | undefined;

  @Output() cubeChangeOutput = new EventEmitter<CubeResult | null>();

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

  ngOnChanges(changes: SimpleChanges) {
    const points = this.points;

    this.select.setValue(points ? points : null);
    this.iconUrl = `assets/icons/${points}.svg`;
  }

  onSelectionChange() {
    this.iconUrl = `assets/icons/${this.select.value}.svg`;

    this.cubeChangeOutput.emit({
      cubeNumber: this.cubeNumber,
      points: Number(this.cubeNumber),
    });
  }
}

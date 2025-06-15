import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
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
export class CubeComponent {
  @Input() cubeNumber: number | undefined;
  @Input() set points(n: number | undefined | null) {
    this.currentPoints = n ? n : undefined;

    this.select.setValue(this.currentPoints ? this.currentPoints : null);
    this.iconUrl = `assets/icons/${this.currentPoints}.svg`;
  }

  @Output() cubeChangeOutput = new EventEmitter<CubeResult | null>();

  currentPoints: number | undefined = 6;
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

  onSelectionChange() {
    this.currentPoints = this.select.value ? this.select.value : undefined;
    this.iconUrl = `assets/icons/${this.currentPoints}.svg`;

    this.cubeChangeOutput.emit({
      cubeNumber: this.cubeNumber,
      points: Number(this.currentPoints),
    });
  }
}

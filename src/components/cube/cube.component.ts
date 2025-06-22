import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CubeResult } from '../casino/casino.component';
import { BehaviorSubject } from 'rxjs';
import { getRandomPoints } from '../../utils/dice.util';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cube',
  imports: [ReactiveFormsModule, FormsModule, AsyncPipe],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CubeComponent {
  @Input() cubeNumber: number | undefined;
  @Input() set throwNo(n: number | undefined) {
    if (n) {
      const points = getRandomPoints();

      this.onSelectionChange(points);
    }
  }

  @Output() cubeChangeOutput = new EventEmitter<CubeResult | null>();

  currentPoints$ = new BehaviorSubject<number>(6);
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
    this.currentPoints$.next(points);
    this.iconUrl = `assets/icons/${points}.svg`;

    this.cubeChangeOutput.emit({
      cubeNumber: this.cubeNumber,
      points: Number(points),
    });
  }
}

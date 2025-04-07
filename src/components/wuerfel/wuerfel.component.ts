import {
  Component,
  effect,
  EventEmitter,
  input,
  Output,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { WuerfelErgebnis } from '../tisch/tisch.component';

@Component({
  selector: 'app-wuerfel',
  imports: [ReactiveFormsModule],
  templateUrl: './wuerfel.component.html',
  styleUrl: './wuerfel.component.scss',
})
export class WuerfelComponent {
  nummer = input<number>();
  augen = input<number>();

  iconUrl = signal<string>('assets/icons/6.svg');

  @Output() wuerfelChange = new EventEmitter<WuerfelErgebnis | null>();

  select = new FormControl<number>(1, Validators.required);

  options = [
    { augenzahl: 1, label: 'Eins' },
    { augenzahl: 2, label: 'Zwei' },
    { augenzahl: 3, label: 'Drei' },
    { augenzahl: 4, label: 'Vier' },
    { augenzahl: 5, label: 'Fünf' },
    { augenzahl: 6, label: 'Sechs' },
  ];

  constructor() {
    effect(() => {
      const augenzahl = this.augen();
      this.select.setValue(augenzahl ? augenzahl : null);

      this.iconUrl.set(`assets/icons/${augenzahl}.svg`);
    });
  }

  onSelectionChange() {
    this.wuerfelChange.emit({
      wuerfelNummer: this.nummer(),
      augenzahl: this.select.value,
    });
  }
}

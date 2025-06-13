import {
  AfterViewInit,
  Component,
  effect,
  input,
  output,
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
export class WuerfelComponent implements AfterViewInit {
  nummer = input<number>();
  augen = input<number | null>(null);

  aktuelleAugen = signal<number | null>(null);
  iconUrl = signal<string>('assets/icons/6.svg');

  wuerfelChangeOutput = output<WuerfelErgebnis | null>();

  // Form mit Select-Box
  select = new FormControl<number>(6, Validators.required);
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
      this.select.setValue(augenzahl);

      this.iconUrl.set(`assets/icons/${augenzahl}.svg`);
    });
  }

  ngAfterViewInit() {
    this.aktuelleAugen.set(this.augen());
  }

  onSelectionChange() {
    this.aktuelleAugen.set(this.select.value);

    this.wuerfelChangeOutput.emit({
      wuerfelNummer: this.nummer(),
      augenzahl: Number(this.aktuelleAugen()),
    });
  }
}

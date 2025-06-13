import { Component, computed, signal } from '@angular/core';
import { WuerfelComponent } from '../wuerfel/wuerfel.component';

export type WuerfelErgebnis = {
  wuerfelNummer: number | undefined;
  augenzahl: number | undefined | null;
};

@Component({
  selector: 'app-tisch',
  imports: [WuerfelComponent],
  templateUrl: './tisch.component.html',
  styleUrl: './tisch.component.scss',
})
export class TischComponent {
  wuerfel1 = signal<number>(6);
  wuerfel2 = signal<number>(6);
  wuerfel3 = signal<number>(6);
  wuerfel4 = signal<number>(6);
  wuerfel5 = signal<number>(6);

  einser = computed(
    () =>
      (this.wuerfel1() === 1 ? 1 : 0) +
      (this.wuerfel2() === 1 ? 1 : 0) +
      (this.wuerfel3() === 1 ? 1 : 0) +
      (this.wuerfel4() === 1 ? 1 : 0) +
      (this.wuerfel5() === 1 ? 1 : 0),
  );

  onWuerfelChange($event: WuerfelErgebnis | null) {
    if ($event?.augenzahl) {
      switch ($event.wuerfelNummer) {
        case 1:
          this.wuerfel1.set($event?.augenzahl);
          break;
        case 2:
          this.wuerfel2.set($event?.augenzahl);
          break;
        case 3:
          this.wuerfel3.set($event?.augenzahl);
          break;
        case 4:
          this.wuerfel4.set($event?.augenzahl);
          break;
        case 5:
          this.wuerfel5.set($event?.augenzahl);
          break;
      }
    }
  }

  onRandomize() {
    this.wuerfel1.set(getRandomAugen());
    this.wuerfel2.set(getRandomAugen());
    this.wuerfel3.set(getRandomAugen());
    this.wuerfel4.set(getRandomAugen());
    this.wuerfel5.set(getRandomAugen());
  }
}

function getRandomAugen() {
  return Math.floor(Math.random() * 6) + 1;
}

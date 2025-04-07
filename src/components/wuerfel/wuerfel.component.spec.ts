import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WuerfelComponent } from './wuerfel.component';

describe('WuerfelComponent', () => {
  let component: WuerfelComponent;
  let fixture: ComponentFixture<WuerfelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WuerfelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WuerfelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

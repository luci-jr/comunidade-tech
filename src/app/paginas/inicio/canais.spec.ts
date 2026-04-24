import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Canais } from './canais';

describe('Canais', () => {
  let component: Canais;
  let fixture: ComponentFixture<Canais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Canais],
    }).compileComponents();

    fixture = TestBed.createComponent(Canais);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

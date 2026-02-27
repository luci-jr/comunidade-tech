import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Repositorios } from './repositorios';

describe('Repositorios', () => {
  let component: Repositorios;
  let fixture: ComponentFixture<Repositorios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Repositorios],
    }).compileComponents();

    fixture = TestBed.createComponent(Repositorios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

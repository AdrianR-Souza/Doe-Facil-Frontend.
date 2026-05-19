import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaDoacao } from './nova-doacao';

describe('NovaDoacao', () => {
  let component: NovaDoacao;
  let fixture: ComponentFixture<NovaDoacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaDoacao],
    }).compileComponents();

    fixture = TestBed.createComponent(NovaDoacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

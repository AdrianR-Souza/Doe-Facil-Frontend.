import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Instituicao } from './instituicao';

describe('Instituicao', () => {
  let component: Instituicao;
  let fixture: ComponentFixture<Instituicao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Instituicao],
    }).compileComponents();

    fixture = TestBed.createComponent(Instituicao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

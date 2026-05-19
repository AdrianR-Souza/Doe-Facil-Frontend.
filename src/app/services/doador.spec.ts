import { TestBed } from '@angular/core/testing';

import { Doador } from './doador';

describe('Doador', () => {
  let service: Doador;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Doador);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

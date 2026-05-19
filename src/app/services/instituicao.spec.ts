import { TestBed } from '@angular/core/testing';

import { Instituicao } from './instituicao';

describe('Instituicao', () => {
  let service: Instituicao;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Instituicao);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

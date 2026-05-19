import { TestBed } from '@angular/core/testing';

import { Pagamento } from './pagamento';

describe('Pagamento', () => {
  let service: Pagamento;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pagamento);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { TiposService } from './tipos.service';

describe('Tipos.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiposService]
    });
  });

  it('should be created', inject([TiposService], (service: TiposService) => {
    expect(service).toBeTruthy();
  }));
});

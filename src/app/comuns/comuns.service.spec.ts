import { TestBed, inject } from '@angular/core/testing';

import { ComunsService } from './comuns.service';

describe('ComunsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComunsService]
    });
  });

  it('should be created', inject([ComunsService], (service: ComunsService) => {
    expect(service).toBeTruthy();
  }));
});

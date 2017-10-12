import { TestBed, inject } from '@angular/core/testing';

import { SubprodutosService } from './subprodutos.service';

describe('SubprodutosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubprodutosService]
    });
  });

  it('should be created', inject([SubprodutosService], (service: SubprodutosService) => {
    expect(service).toBeTruthy();
  }));
});

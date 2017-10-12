import { TestBed, inject } from '@angular/core/testing';

import { CategoriaProdutoService } from './categoria.produto.service';

describe('Categoria.ProdutoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriaProdutoService]
    });
  });

  it('should be created', inject([CategoriaProdutoService], (service: CategoriaProdutoService) => {
    expect(service).toBeTruthy();
  }));
});

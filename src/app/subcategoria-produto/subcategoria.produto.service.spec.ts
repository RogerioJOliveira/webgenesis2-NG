import { TestBed, inject } from '@angular/core/testing';

import { SubcategoriaProdutoService } from './subcategoria.produto.service';

describe('SubcategoriaProdutoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubcategoriaProdutoService]
    });
  });

  it('should be created', inject([SubcategoriaProdutoService], (service: SubcategoriaProdutoService) => {
    expect(service).toBeTruthy();
  }));
});

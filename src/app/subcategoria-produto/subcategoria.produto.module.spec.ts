import { SubcategoriaProdutoModule } from './subcategoria.produto.module';

describe('SubcategoriaProdutoModule', () => {
  let subcategoriaProdutoModule: SubcategoriaProdutoModule;

  beforeEach(() => {
    subcategoriaProdutoModule = new SubcategoriaProdutoModule();
  });

  it('should create an instance', () => {
    expect(subcategoriaProdutoModule).toBeTruthy();
  });
});

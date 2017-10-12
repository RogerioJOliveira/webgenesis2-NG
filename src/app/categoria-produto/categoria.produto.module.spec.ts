import { CategoriaProdutoModule } from './categoria.produto.module';

describe('Categoria.ProdutoModule', () => {
  let categoriaProdutoModule: CategoriaProdutoModule;

  beforeEach(() => {
    categoriaProdutoModule = new CategoriaProdutoModule();
  });

  it('should create an instance', () => {
    expect(categoriaProdutoModule).toBeTruthy();
  });
});

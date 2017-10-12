import { SubprodutosModule } from './subprodutos.module';

describe('SubprodutosModule', () => {
  let subprodutosModule: SubprodutosModule;

  beforeEach(() => {
    subprodutosModule = new SubprodutosModule();
  });

  it('should create an instance', () => {
    expect(subprodutosModule).toBeTruthy();
  });
});

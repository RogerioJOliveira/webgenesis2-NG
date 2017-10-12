import { ServicosModule } from './servicos.module';

describe('ServicosModule', () => {
  let servicosModule: ServicosModule;

  beforeEach(() => {
    servicosModule = new ServicosModule();
  });

  it('should create an instance', () => {
    expect(servicosModule).toBeTruthy();
  });
});

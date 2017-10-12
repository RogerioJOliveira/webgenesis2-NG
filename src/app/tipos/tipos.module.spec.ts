import { TiposModule } from './tipos.module';

describe('TiposModule', () => {
  let tiposModule: TiposModule;

  beforeEach(() => {
    tiposModule = new TiposModule();
  });

  it('should create an instance', () => {
    expect(tiposModule).toBeTruthy();
  });
});

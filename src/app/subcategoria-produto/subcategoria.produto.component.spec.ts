import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriaProdutoComponent } from './subcategoria.produto.component';

describe('Subcategoria.ProdutoComponent', () => {
  let component: SubcategoriaProdutoComponent;
  let fixture: ComponentFixture<SubcategoriaProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoriaProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoriaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

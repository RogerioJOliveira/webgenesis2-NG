import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprodutosComponent } from './subprodutos.component';

describe('SubprodutosComponent', () => {
  let component: SubprodutosComponent;
  let fixture: ComponentFixture<SubprodutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubprodutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubprodutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

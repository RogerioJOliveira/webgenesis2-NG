import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpesssoaComponent } from './addpesssoa.component';

describe('AddpesssoaComponent', () => {
  let component: AddpesssoaComponent;
  let fixture: ComponentFixture<AddpesssoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpesssoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpesssoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

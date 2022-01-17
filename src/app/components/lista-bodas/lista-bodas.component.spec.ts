import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBodasComponent } from './lista-bodas.component';

describe('ListaBodasComponent', () => {
  let component: ListaBodasComponent;
  let fixture: ComponentFixture<ListaBodasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaBodasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaBodasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

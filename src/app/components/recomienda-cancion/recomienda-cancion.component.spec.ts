import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomiendaCancionComponent } from './recomienda-cancion.component';

describe('RecomiendaCancionComponent', () => {
  let component: RecomiendaCancionComponent;
  let fixture: ComponentFixture<RecomiendaCancionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomiendaCancionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomiendaCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

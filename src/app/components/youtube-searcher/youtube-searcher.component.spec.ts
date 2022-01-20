import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeSearcherComponent } from './youtube-searcher.component';

describe('YoutubeSearcherComponent', () => {
  let component: YoutubeSearcherComponent;
  let fixture: ComponentFixture<YoutubeSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeSearcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

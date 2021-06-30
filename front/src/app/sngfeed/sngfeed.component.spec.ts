import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SngfeedComponent } from './sngfeed.component';

describe('SngfeedComponent', () => {
  let component: SngfeedComponent;
  let fixture: ComponentFixture<SngfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SngfeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SngfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDsngComponent } from './location-dsng.component';

describe('LocationDsngComponent', () => {
  let component: LocationDsngComponent;
  let fixture: ComponentFixture<LocationDsngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationDsngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDsngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

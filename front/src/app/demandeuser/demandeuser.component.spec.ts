import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeuserComponent } from './demandeuser.component';

describe('DemandeuserComponent', () => {
  let component: DemandeuserComponent;
  let fixture: ComponentFixture<DemandeuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

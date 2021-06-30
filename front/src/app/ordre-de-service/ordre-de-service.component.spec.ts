import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreDeServiceComponent } from './ordre-de-service.component';

describe('OrdreDeServiceComponent', () => {
  let component: OrdreDeServiceComponent;
  let fixture: ComponentFixture<OrdreDeServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdreDeServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreDeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

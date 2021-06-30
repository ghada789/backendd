import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDeDemandeComponent } from './liste-de-demande.component';

describe('ListeDeDemandeComponent', () => {
  let component: ListeDeDemandeComponent;
  let fixture: ComponentFixture<ListeDeDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDeDemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDeDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

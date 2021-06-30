import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DexListeComponent } from './dex-liste.component';

describe('DexListeComponent', () => {
  let component: DexListeComponent;
  let fixture: ComponentFixture<DexListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DexListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DexListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

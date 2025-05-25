import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPsicometricoComponent } from './perfil-psicometrico.component';

describe('PerfilPsicometricoComponent', () => {
  let component: PerfilPsicometricoComponent;
  let fixture: ComponentFixture<PerfilPsicometricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilPsicometricoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilPsicometricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

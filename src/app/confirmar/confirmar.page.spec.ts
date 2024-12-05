import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmarPage } from './confirmar.page';

describe('ConfirmarPage', () => {
  let component: ConfirmarPage;
  let fixture: ComponentFixture<ConfirmarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

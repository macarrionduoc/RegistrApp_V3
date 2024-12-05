import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarPage } from './consultar.page';

describe('ConsultarPage', () => {
  let component: ConsultarPage;
  let fixture: ComponentFixture<ConsultarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

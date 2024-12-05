import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Mesa2Page } from './mesa2.page';

describe('Mesa2Page', () => {
  let component: Mesa2Page;
  let fixture: ComponentFixture<Mesa2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Mesa2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

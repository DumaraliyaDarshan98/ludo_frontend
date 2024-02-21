/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IWonComponent } from './i-won.component';

describe('IWonComponent', () => {
  let component: IWonComponent;
  let fixture: ComponentFixture<IWonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IWonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IWonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

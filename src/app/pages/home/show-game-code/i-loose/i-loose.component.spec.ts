/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ILooseComponent } from './i-loose.component';

describe('ILooseComponent', () => {
  let component: ILooseComponent;
  let fixture: ComponentFixture<ILooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ILooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ILooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { PatternMainComponent } from './main.component';

describe('Component: Main', () => {
  it('should create an instance', () => {
    let component = new PatternMainComponent();
    expect(component).toBeTruthy();
  });
});

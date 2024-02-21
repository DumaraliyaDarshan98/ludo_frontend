/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShowGameCodeService } from './show-game-code.service';

describe('Service: ShowGameCode', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowGameCodeService]
    });
  });

  it('should ...', inject([ShowGameCodeService], (service: ShowGameCodeService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { DatalayerService } from './datalayer.service';

describe('Service: Datalayer', () => {
  beforeEach(() => {
    addProviders([DatalayerService]);
  });

  it('should ...',
    inject([DatalayerService],
      (service: DatalayerService) => {
        expect(service).toBeTruthy();
      }));
});

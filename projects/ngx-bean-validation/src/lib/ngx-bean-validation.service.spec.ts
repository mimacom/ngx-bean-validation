import {inject, TestBed} from '@angular/core/testing';

import {NgxBeanValidationService} from './ngx-bean-validation.service';

describe('NgxBeanValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxBeanValidationService]
    });
  });

  it('should be created', inject([NgxBeanValidationService], (service: NgxBeanValidationService<any>) => {
    // expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { NavtopobservService } from './navtopobserv.service';

describe('NavtopobservService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavtopobservService]
    });
  });

  it('should be created', inject([NavtopobservService], (service: NavtopobservService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { PopulerMoviesService } from './populer-movies.service';

describe('PopulerMoviesService', () => {
  let service: PopulerMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopulerMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

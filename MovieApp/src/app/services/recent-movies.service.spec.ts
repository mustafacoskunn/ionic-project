import { TestBed } from '@angular/core/testing';

import { RecentMoviesService } from './recent-movies.service';

describe('RecentMoviesService', () => {
  let service: RecentMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

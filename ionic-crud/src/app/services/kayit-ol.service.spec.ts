import { TestBed } from '@angular/core/testing';

import { KayitOlService } from './kayit-ol.service';

describe('KayitOlService', () => {
  let service: KayitOlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KayitOlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

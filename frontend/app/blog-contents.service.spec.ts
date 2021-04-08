import { TestBed } from '@angular/core/testing';

import { BlogContentsService } from './blog-contents.service';

describe('BlogContentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogContentsService = TestBed.get(BlogContentsService);
    expect(service).toBeTruthy();
  });
});

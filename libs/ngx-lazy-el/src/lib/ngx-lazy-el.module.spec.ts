import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxLazyElModule } from './ngx-lazy-el.module';

describe('NgxLazyElModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgxLazyElModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxLazyElModule).toBeDefined();
  });
});

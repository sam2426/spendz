import { TestBed } from '@angular/core/testing';

import { ExpensesSocketService } from './expenses-socket.service';

describe('ExpensesSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpensesSocketService = TestBed.get(ExpensesSocketService);
    expect(service).toBeTruthy();
  });
});

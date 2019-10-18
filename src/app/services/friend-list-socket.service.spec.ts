import { TestBed } from '@angular/core/testing';

import { FriendListSocketService } from './friend-list-socket.service';

describe('FriendListSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FriendListSocketService = TestBed.get(FriendListSocketService);
    expect(service).toBeTruthy();
  });
});

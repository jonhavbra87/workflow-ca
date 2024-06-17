/* eslint-env jest */

import * as mocks from '../../../mocks';
import { logout } from './logout';

describe('logout', () => {
  beforeEach(() => {
    global.localStorage = mocks.localStorageMock();
  });
  afterEach(() => {
    global.localStorage.clear();
  });
  it('clears the token from localStorage', () => {
    localStorage.setItem('token', mocks.accessToken);
    logout();
    expect(localStorage.getItem('token')).toBe(null);
  });
});

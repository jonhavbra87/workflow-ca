/* eslint-env jest */

import * as mocks from '../../../mocks';
import { logout } from './logout';
import { login } from './login';
import { load } from '../../storage/';

const userResponseClone = () => ({ ...mocks.authResponse });

describe('logout', () => {
  beforeEach(() => {
    global.fetch = mocks.createMockFetch(userResponseClone());
    global.localStorage = mocks.localStorageMock();
  });
  afterEach(() => {
    global.localStorage.clear();
  });

  it('should set the token with a successful login', async () => {
    await login(mocks.validUserData.email, mocks.validUserData.password);
    expect(load('token')).toBe(mocks.accessToken);
  });

  it('should return the user name with a successful login', async () => {
    const result = await login(
      mocks.validUserData.email,
      mocks.validUserData.password,
    );
    expect(result.name).toBe(mocks.validUserData.name);
  });

  it('clears the token from localStorage', () => {
    localStorage.setItem('token', mocks.accessToken);
    localStorage.setItem('profile', mocks.authResponse);
    logout();
    expect(localStorage.getItem('token')).toBe(null);
    expect(localStorage.getItem('profile')).toBe(null);
  });
});

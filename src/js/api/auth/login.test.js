/* eslint-env jest */

import * as mocks from '../../../mocks';
import { login } from './login';
import { load } from '../../storage/';

const userResponseClone = () => ({ ...mocks.authResponse });

describe('login', () => {
  beforeEach(() => {
    global.fetch = mocks.createMockFetch(userResponseClone());
    global.localStorage = mocks.localStorageMock();
  });

  afterEach(() => {
    global.fetch.mockClear();
    global.localStorage.clear();
  });

  it('should set the token with a successful login', async () => {
    await login(mocks.userData.email, mocks.userData.password);
    expect(load('token')).toBe(mocks.accessToken);
  });

  it('should return the user name with a successful login', async () => {
    const result = await login(mocks.userData.email, mocks.userData.password);
    expect(result.name).toBe(mocks.userData.name);
  });
});

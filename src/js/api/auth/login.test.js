/* UNIT testing */

import * as mocks from '../../../mocks';
import { login } from './login';
import { load } from '../../storage/';
import { validateEmail } from './emailvalidator.js';

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
});

describe('email validation', () => {
  it('should reject invalid email format', () => {
    const invalidEmail = mocks.invalidUserData.email;
    expect(validateEmail(invalidEmail)).toBe(false);
  });

  it('should accept valid email format', () => {
    const validEmail = mocks.validUserData.email;
    expect(validateEmail(validEmail)).toBe(true);
  });
});

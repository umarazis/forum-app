/**
 * skenario test
 *
 * - asyncRegisterUser thunk
 *  - should dispatch action correctly and call success toast when data fetching success
 *  - should dispatch action correctly and call error toast when data fetching failed
 */
import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { asyncRegisterUser } from './action';

const fakeUser = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;
    delete api._register;
  });

  it('should dispatch action correctly and call success toast when data fetching success', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.resolve(fakeUser);

    // mock dispatch
    const dispatch = vi.fn();

    // mock toast
    toast.success = vi.fn();

    // action
    await asyncRegisterUser(fakeUser)(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(hideLoading());
    expect(toast.success).toBeCalledWith('Registration success');
  });

  it('should dispatch action correctly and call error toast when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock toast
    toast.error = vi.fn();

    // action
    await asyncRegisterUser(fakeUser)(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(hideLoading());
    expect(toast.error).toBeCalledWith(fakeErrorResponse.message);
  });
});

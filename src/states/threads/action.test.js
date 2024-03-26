import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import {
  asyncCreateThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncNeutralizeThreadVote,
  createThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  neutralizeThreadVoteActionCreator,
} from './action';

const fakeErrorResponse = new Error('Ups, something went wrong');

const fakeState = {
  authUser: {
    id: 'users-1',
  },
};

/**
 * skenario test
 *
 * - asyncCreateThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly and call error toast when data fetching failed
 */
const fakeThreadResponse = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'users-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const { title, body, category } = fakeThreadResponse;

describe('asyncCreateThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    delete api._createThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.resolve(fakeThreadResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncCreateThread({ title, body, category })(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(createThreadActionCreator(fakeThreadResponse));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly and call error toast when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock toast
    toast.error = vi.fn();

    // action
    await asyncCreateThread({ title, body, category })(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(hideLoading());
    expect(toast.error).toBeCalledWith(fakeErrorResponse.message);
  });
});

/**
 * skenario test
 *
 * - asyncToggleUpVoteThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 *  - should dispatch action correctly when isDownvoted is true and data fetching success
 *  - should dispatch action correctly when isDownvoted is true and data fetching failed
 */
const fakeUpvote = {
  id: 'vote-1',
  userId: fakeState.authUser.id,
  threadId: 'thread-1',
  voteType: 1,
};

describe('asyncToggleUpVoteThread thunk', () => {
  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
  });

  afterEach(() => {
    api.upVoteThread = api._upVoteThread;
    delete api._upVoteThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.upVoteThread = () => Promise.resolve(fakeUpvote);
    const getState = () => fakeState;

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncToggleUpVoteThread(fakeUpvote.threadId, false)(dispatch, getState);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(toggleUpVoteThreadActionCreator(fakeUpvote));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.upVoteThread = () => Promise.reject(fakeErrorResponse);
    const getState = () => fakeState;

    // mock dispatch
    const dispatch = vi.fn();

    // mock toast
    toast.error = vi.fn();

    // action
    await asyncToggleUpVoteThread(fakeUpvote.threadId, false)(dispatch, getState);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(toggleUpVoteThreadActionCreator(fakeUpvote));
    expect(dispatch).toBeCalledWith(hideLoading());
    expect(dispatch).toBeCalledWith(toggleUpVoteThreadActionCreator(fakeUpvote));
    expect(toast.error).toBeCalledWith(fakeErrorResponse.message);
  });

  it('should dispatch action correctly when isDownvoted is true and data fetching success', async () => {
    // arrange
    // stub implementation
    api.upVoteThread = () => Promise.resolve(fakeUpvote);
    const getState = () => fakeState;

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncToggleUpVoteThread(fakeUpvote.threadId, true)(dispatch, getState);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(toggleUpVoteThreadActionCreator(fakeUpvote));
    expect(dispatch).toBeCalledWith(toggleDownVoteThreadActionCreator(fakeUpvote));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly when isDownvoted is true and data fetching failed', async () => {
    // arrange
    // stub implementation
    api.upVoteThread = () => Promise.reject(fakeErrorResponse);
    const getState = () => fakeState;

    // mock dispatch
    const dispatch = vi.fn();

    // mock toast
    toast.error = vi.fn();

    // action
    await asyncToggleUpVoteThread(fakeUpvote.threadId, true)(dispatch, getState);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(toggleUpVoteThreadActionCreator(fakeUpvote));
    expect(dispatch).toBeCalledWith(toggleDownVoteThreadActionCreator(fakeUpvote));
    expect(dispatch).toBeCalledWith(hideLoading());
    expect(dispatch).toBeCalledWith(toggleUpVoteThreadActionCreator(fakeUpvote));
    expect(dispatch).toBeCalledWith(toggleDownVoteThreadActionCreator(fakeUpvote));
    expect(toast.error).toBeCalledWith(fakeErrorResponse.message);
  });
});

/**
 * skenario test
 *
 * - asyncToggleDownVoteThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 *  - should dispatch action correctly when isUpvoted is true and data fetching success
 *  - should dispatch action correctly when isUpvoted is true and data fetching failed
 */
const fakeDownvote = {
  id: 'vote-1',
  userId: fakeState.authUser.id,
  threadId: 'thread-1',
  voteType: -1,
};

describe('asyncToggleDownVoteThread thunk', () => {
  beforeEach(() => {
    api._downVoteThread = api.downVoteThread;
  });

  afterEach(() => {
    api.downVoteThread = api._downVoteThread;
    delete api._downVoteThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.downVoteThread = () => Promise.resolve(fakeDownvote);
    const getState = () => fakeState;

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncToggleDownVoteThread(fakeDownvote.threadId, false)(dispatch, getState);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(toggleDownVoteThreadActionCreator(fakeDownvote));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.downVoteThread = () => Promise.reject(fakeErrorResponse);
    const getState = () => fakeState;

    // mock dispatch
    const dispatch = vi.fn();

    // mock toast
    toast.error = vi.fn();

    // action
    await asyncToggleDownVoteThread(fakeDownvote.threadId, false)(dispatch, getState);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(toggleDownVoteThreadActionCreator(fakeDownvote));
    expect(dispatch).toBeCalledWith(hideLoading());
    expect(dispatch).toBeCalledWith(toggleDownVoteThreadActionCreator(fakeDownvote));
    expect(toast.error).toBeCalledWith(fakeErrorResponse.message);
  });

  it('should dispatch action correctly when isUpvoted is true and data fetching success', async () => {
    // arrange
    // stub implementation
    api.downVoteThread = () => Promise.resolve(fakeDownvote);
    const getState = () => fakeState;

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncToggleDownVoteThread(fakeDownvote.threadId, true)(dispatch, getState);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(toggleDownVoteThreadActionCreator(fakeDownvote));
    expect(dispatch).toBeCalledWith(toggleUpVoteThreadActionCreator(fakeDownvote));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly when isUpvoted is true and data fetching failed', async () => {
    // arrange
    // stub implementation
    api.downVoteThread = () => Promise.reject(fakeErrorResponse);
    const getState = () => fakeState;

    // mock dispatch
    const dispatch = vi.fn();

    // mock toast
    toast.error = vi.fn();

    // action
    await asyncToggleDownVoteThread(fakeDownvote.threadId, true)(dispatch, getState);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(toggleDownVoteThreadActionCreator(fakeDownvote));
    expect(dispatch).toBeCalledWith(toggleUpVoteThreadActionCreator(fakeDownvote));
    expect(dispatch).toBeCalledWith(hideLoading());
    expect(dispatch).toBeCalledWith(toggleDownVoteThreadActionCreator(fakeDownvote));
    expect(dispatch).toBeCalledWith(toggleUpVoteThreadActionCreator(fakeDownvote));
    expect(toast.error).toBeCalledWith(fakeErrorResponse.message);
  });
});

/**
 * skenario test
 *
 * - asyncNeutralizeThreadVote thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed and isUpvoted is true
 *  - should dispatch action correctly when data fetching failed and isUpvoted is false
 */
const fakeNeutralizeVote = {
  id: 'vote-1',
  userId: fakeState.authUser.id,
  threadId: 'thread-1',
  voteType: 0,
};

describe('asyncNeutralizeThreadVote thunk', () => {
  beforeEach(() => {
    api._neutralizeThreadVote = api.neutralizeThreadVote;
  });

  afterEach(() => {
    api.neutralizeThreadVote = api._neutralizeThreadVote;
    delete api._neutralizeThreadVote;
  });

  it('should dispatch action correctly when fetching success', async () => {
    // arrange
    // stub implementation
    api.neutralizeThreadVote = () => Promise.resolve(fakeNeutralizeVote);
    const getState = () => fakeState;

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncNeutralizeThreadVote(fakeNeutralizeVote.threadId, true)(dispatch, getState);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(neutralizeThreadVoteActionCreator(fakeNeutralizeVote));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed and isUpvoted is true', async () => {
    // arrange
    // stub implementation
    api.neutralizeThreadVote = () => Promise.reject(fakeErrorResponse);
    const getState = () => fakeState;

    // mock dispatch
    const dispatch = vi.fn();

    // mock toast
    toast.error = vi.fn();

    // action
    await asyncNeutralizeThreadVote(fakeNeutralizeVote.threadId, true)(dispatch, getState);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(hideLoading());
    expect(toast.error).toBeCalledWith(fakeErrorResponse.message);
    expect(dispatch).toBeCalledWith(toggleUpVoteThreadActionCreator(fakeNeutralizeVote));
  });

  it('should dispatch action correctly when data fetching failed and isUpvoted is false', async () => {
    // arrange
    // stub implementation
    api.neutralizeThreadVote = () => Promise.reject(fakeErrorResponse);
    const getState = () => fakeState;

    // mock dispatch
    const dispatch = vi.fn();

    // mock toast
    toast.error = vi.fn();

    // action
    await asyncNeutralizeThreadVote(fakeNeutralizeVote.threadId, false)(dispatch, getState);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(hideLoading());
    expect(toast.error).toBeCalledWith(fakeErrorResponse.message);
    expect(dispatch).toBeCalledWith(toggleDownVoteThreadActionCreator(fakeNeutralizeVote));
  });
});

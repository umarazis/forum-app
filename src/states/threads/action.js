import { toast } from 'react-toastify';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  CREATE_THREAD: 'CREATE_THREAD',
  TOGGLE_UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  TOGGLE_DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRALIZE_THREAD_VOTE: 'NEUTRALIZE_THREAD_VOTE',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function createThreadActionCreator(thread) {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizeThreadVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_THREAD_VOTE,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncCreateThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(createThreadActionCreator(thread));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteThread(threadId, isDownvoted) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
    if (isDownvoted) {
      dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
      if (isDownvoted) {
        dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteThread(threadId, isUpvoted) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
    if (isUpvoted) {
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
      if (isUpvoted) {
        dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeThreadVote(threadId, isUpvoted) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.neutralizeThreadVote(threadId);
    } catch (error) {
      toast.error(error.message);
      if (isUpvoted) {
        dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
      } else {
        dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  createThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  neutralizeThreadVoteActionCreator,
  asyncCreateThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncNeutralizeThreadVote,
};

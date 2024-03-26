import { toast } from 'react-toastify';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_UP_VOTE_THREAD_DETAIL: 'TOGGLE_UP_VOTE_THREAD_DETAIL',
  TOGGLE_DOWN_VOTE_THREAD_DETAIL: 'TOGGLE_DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_THREAD_DETAIL_VOTE: 'NEUTRALIZE_THREAD_DETAIL_VOTE',
  CREATE_COMMENT: 'CREATE_COMMENT',
  TOGGLE_UP_VOTE_COMMENT: 'TOGGLE_UP_VOTE_COMMENT',
  TOGGLE_DOWN_VOTE_COMMENT: 'TOGGLE_DOWN_VOTE_COMMENT',
  NEUTRALIZE_COMMENT_VOTE: 'NEUTRALIZE_COMMENT_VOTE',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleUpVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleDownVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralizeThreadDetailVoteActionCreator(userId) {
  return {
    type: ActionType.NEUTRALIZE_THREAD_DETAIL_VOTE,
    payload: {
      userId,
    },
  };
}

function createCommentActionCreator(comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralizeCommentVoteActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_COMMENT_VOTE,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteThreadDetail(isDownvoted) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
    if (isDownvoted) {
      dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
    }
    try {
      await api.upVoteThread(threadDetail.id);
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
      if (isDownvoted) {
        dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
      }
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteThreadDetail(isUpvoted) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
    if (isUpvoted) {
      dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
    }
    try {
      await api.downVoteThread(threadDetail.id);
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
      if (isUpvoted) {
        dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
      }
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeThreadDetailVote(isUpvoted) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(neutralizeThreadDetailVoteActionCreator(authUser.id));

    try {
      await api.neutralizeThreadVote(threadDetail.id);
    } catch (error) {
      toast.error(error.message);
      if (isUpvoted) {
        dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
      } else {
        dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
      }
    }
    dispatch(hideLoading());
  };
}

function asyncCreateComment(content) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { threadDetail } = getState();
    try {
      const comment = await api.createComment({ threadId: threadDetail.id, content });
      dispatch(createCommentActionCreator(comment));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteComment(commentId, isDownvoted) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
    if (isDownvoted) {
      dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
    try {
      await api.upVoteComment(threadDetail.id, commentId);
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
      if (isDownvoted) {
        dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
      }
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteComment(commentId, isUpvoted) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
    if (isUpvoted) {
      dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
    try {
      await api.downVoteComment(threadDetail.id, commentId);
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
      if (isUpvoted) {
        dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
      }
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeCommentVote(commentId, isUpvoted) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(neutralizeCommentVoteActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.neutralizeCommentVote(threadDetail.id, commentId);
    } catch (error) {
      toast.error(error.message);
      if (isUpvoted) {
        dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
      } else {
        dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
      }
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  neutralizeThreadDetailVoteActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  neutralizeCommentVoteActionCreator,
  asyncReceiveThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncNeutralizeThreadDetailVote,
  asyncCreateComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncNeutralizeCommentVote,
};

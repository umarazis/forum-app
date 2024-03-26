import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CommentsList from '../components/CommentsList';
import ThreadDetail from '../components/ThreadDetail';
import CreateCommentInput from '../components/CreateCommentInput';
import {
  asyncReceiveThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncNeutralizeThreadDetailVote,
  asyncCreateComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncNeutralizeCommentVote,
} from '../states/threadDetail/action';

function DetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((states) => states.threadDetail);
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpVoteThread = (isDownVoted) => {
    dispatch(asyncToggleUpVoteThreadDetail(isDownVoted));
  };

  const onDownVoteThread = (isUpVoted) => {
    dispatch(asyncToggleDownVoteThreadDetail(isUpVoted));
  };

  const onNeutralizeThreadVote = (isUpVoted) => {
    dispatch(asyncNeutralizeThreadDetailVote(isUpVoted));
  };

  const onCreateComment = (content) => {
    dispatch(asyncCreateComment(content));
  };

  const onUpVoteComment = (commentId, isDownVoted) => {
    dispatch(asyncToggleUpVoteComment(commentId, isDownVoted));
  };

  const onDownVoteComment = (commentId, isUpVoted) => {
    dispatch(asyncToggleDownVoteComment(commentId, isUpVoted));
  };

  const onNeutralizeCommentVote = (commentId, isUpVoted) => {
    dispatch(asyncNeutralizeCommentVote(commentId, isUpVoted));
  };

  if (!threadDetail) {
    return null;
  }

  const commentList = threadDetail.comments.map((comment) => ({
    ...comment,
    authUser: authUser.id,
  }));

  return (
    <>
      <section className="main-container card">
        <ThreadDetail
          {...threadDetail}
          authUser={authUser.id}
          upVote={onUpVoteThread}
          downVote={onDownVoteThread}
          neutralizeVote={onNeutralizeThreadVote}
          totalComments={threadDetail.comments.length.toString()}
        />
        <h2>{`Komentar (${commentList.length})`}</h2>
        <CommentsList
          comments={commentList}
          upVote={onUpVoteComment}
          downVote={onDownVoteComment}
          neutralizeVote={onNeutralizeCommentVote}
        />
      </section>
      <aside>
        <article className="side-container card">
          <header>
            <h2>Beri Komentar</h2>
            <CreateCommentInput createComment={onCreateComment} />
          </header>
        </article>
      </aside>
    </>
  );
}

export default DetailPage;

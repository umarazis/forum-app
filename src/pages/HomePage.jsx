import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaChartBar } from 'react-icons/fa';
import { asyncPopulateThreadsAndUsers } from '../states/shared/action';
import {
  asyncCreateThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncNeutralizeThreadVote,
} from '../states/threads/action';
import ThreadsList from '../components/ThreadsList';
import CategoriesList from '../components/CategoriesList';
import CreateThreadInput from '../components/CreateThreadInput';
import ModalCreateThread from '../components/ModalCreateThread';
import ActionButton from '../components/ActionButton';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const authUser = useSelector((states) => states.authUser);
  const [filter, setFilter] = useState('');
  const [display, setDisplay] = useState('none');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilter(searchParams.get('filter') || '');
  }, [searchParams]);

  const onUpVote = (id, isDownVoted) => {
    dispatch(asyncToggleUpVoteThread(id, isDownVoted));
  };

  const onDownVote = (id, isUpVoted) => {
    dispatch(asyncToggleDownVoteThread(id, isUpVoted));
  };

  const onNeutralizeVote = (id, isUpVoted) => {
    dispatch(asyncNeutralizeThreadVote(id, isUpVoted));
  };

  const onCreateThread = (title, body, category) => {
    dispatch(asyncCreateThread({ title, body, category }));
    setDisplay('none');
  };

  const onToggleCreateThreadModal = () => {
    if (display === 'none') {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
  };

  const onCategoryClick = (keyword) => {
    setFilter(keyword);
    setSearchParams({ filter: keyword });
  };

  const filteredThreads = threads.filter(
    (thread) => thread.category
      .toLowerCase()
      .includes(filter.toLowerCase()),
  );

  const threadList = filteredThreads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  const categoriesTemporary = threads.map(
    (thread) => thread.category,
  );

  const categories = categoriesTemporary.length > 10
    ? [...new Set(categoriesTemporary)].slice(0, 10)
    : [...new Set(categoriesTemporary)];

  return (
    <>
      <section className="main-container card">
        <article>
          <h2>
            {`Thread Tersedia (${filteredThreads.length})`}
            {filter && `, Kategori: #${filter} `}
          </h2>
          <ThreadsList
            threads={threadList}
            upVote={onUpVote}
            downVote={onDownVote}
            neutralizeVote={onNeutralizeVote}
          />
        </article>
      </section>
      <aside>
        <article className="side-container card">
          <header>
            <h2>Kategori Terbaru</h2>
          </header>
          <section>
            <CategoriesList
              categories={categories}
              onCategoryClick={onCategoryClick}
            />
          </section>
        </article>
      </aside>
      <ModalCreateThread
        display={display}
        onToggleDisplayModal={onToggleCreateThreadModal}
      >
        <CreateThreadInput createThread={onCreateThread} />
      </ModalCreateThread>
      <div className="action-button-list">
        <ActionButton
          title="Leaderboards"
          onClick={() => navigate('/leaderboards')}
          icon={<FaChartBar />}
          type="default"
        />
        <ActionButton
          title="Buat Thread"
          onClick={onToggleCreateThreadModal}
          icon={<FaPencilAlt />}
          type="primary"
        />
      </div>
    </>
  );
}

export default HomePage;

import styles from './App.module.scss';

import Header from '../Header';
import Loading from '../Loading';
import ArticleSheetPage from '../ArticleSheetPage';
import ArticlePage from '../ArticlePage/ArticlePage';
import RegistrationPage from '../RegistrationPage';
import LogInPage from '../LogInPage';
import EditProfilePage from '../EditProfilePage';
import CreateArticlePage from '../CreateArticlePage';
import EditArticle from '../EditArticle';
import { Error, NotFound } from '../Alerts/Alerts';

import { fetchArticles } from '../../store/articles-slice';

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles({ page: 1 }));
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <Header />
      {status === 'resolved' && (
        <Routes>
          <Route index element={<ArticleSheetPage />} />
          <Route path="/articles" element={<ArticleSheetPage />} />
          <Route path="/sign-up" element={<RegistrationPage type="Create new account" />} />
          <Route path="/sign-in" element={<LogInPage type="Sign In" />} />
          <Route path="/profile" element={<EditProfilePage type="Edit Profile" />} />
          <Route path="/new-article" element={<CreateArticlePage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/articles/:slug/edit" element={<EditArticle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      {error && <Error />}
      {status === 'loading' && <Loading />}
    </div>
  );
}

export default App;

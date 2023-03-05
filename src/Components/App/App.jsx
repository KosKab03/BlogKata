import styles from './App.module.scss';

import Header from '../Header';
import ArticleSheetPage from '../ArticleSheetPage';
import ArticlePage from '../ArticlePage/ArticlePage';
import RegistrationPage from '../RegistrationPage';

import { fetchArticles } from '../../Store/ArticlesSlice';

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <Header />
      <Routes>
        <Route index element={<ArticleSheetPage />} />
        <Route path="/articles" element={<ArticleSheetPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/sign-up" element={<RegistrationPage />} />
      </Routes>
    </div>
  );
}

export default App;

import styles from './ArticleSheetPage.module.scss';

import HOCArticle from '../HOCs/HOCArticle';

import { fetchArticles, setPage } from '../../Store/ArticlesSlice';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';

function ArticleSheetPage() {
  const dispatch = useDispatch();
  const { articles, totalPages, page } = useSelector((state) => state.articles);

  return (
    <div className={styles['article-page']}>
      <div>{articles.map((item) => HOCArticle(item))}</div>
      <Pagination
        className={styles.pages}
        pageSize={1}
        current={page}
        total={totalPages}
        onChange={(value) => {
          dispatch(setPage(value));
          dispatch(fetchArticles({ page: value }));
        }}
      />
    </div>
  );
}

export default ArticleSheetPage;

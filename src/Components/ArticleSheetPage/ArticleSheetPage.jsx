import styles from './ArticleSheetPage.module.scss';

import { fetchArticles } from '../../Store/ArticlesSlice';
import HOCArticle from '../HOCs/HOCArticle';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';

function ArticleSheetPage() {
  const dispatch = useDispatch();

  const [current, setCurrent] = useState(1);
  const { articles, totalPages } = useSelector((state) => state.articles);

  return (
    <div className={styles['article-page']}>
      <div>{articles.map((item) => HOCArticle(item))}</div>
      <Pagination
        className={styles.pages}
        current={current}
        total={totalPages}
        defaultPageSize={1}
        onChange={(page) => {
          setCurrent(page);
          dispatch(fetchArticles(page));
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
}

export default ArticleSheetPage;

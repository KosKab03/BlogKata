import styles from './ArticlePage.module.scss';

import HOCArticle from '../HOCs/HOCArticle';
import { fetchArticle } from '../../Store/ArticlesSlice';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function ArticlePage() {
  const [article, setArticle] = useState();
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArticle(slug))
      .then((res) => res)
      .then((data) => {
        setArticle(data.payload.article);
        console.log(data.payload.article);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={styles['article-page']}>{article && HOCArticle(article, true)}</div>;
}

export default ArticlePage;

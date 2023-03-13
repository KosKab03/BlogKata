import styles from './ArticlePage.module.scss';

import HOCCommonBlock from '../HOCs/HOCCommonBlock';
import { fetchArticle, resetArticleView, fetchArticles, setLike, deleteLike, setPage } from '../../Store/ArticlesSlice';
import { deleteArticle, resetCreateArticle } from '../../Store/CreateArticle';

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';

const intialArticle = {
  author: { username: '', image: '', following: false },
  body: '',
  description: '',
  favorited: false,
  favoritesCount: 0,
  slug: '',
  tagList: [],
  title: '',
  updatedAt: '2023-03-11T11:57:16.032Z',
};

function ArticlePage() {
  const [article, setArticle] = useState(intialArticle);
  const [hidden, toggleHidden] = useState(false);
  const articleFromState = useSelector((state) => state.articles.articleView);
  const user = localStorage.getItem('username');
  const idCheck = uuidv4();
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { title, description, tagList, author, updatedAt, body } = article;
  const [likeCount, setLikeCount] = useState();
  const [like, toggleLike] = useState();
  const date = format(new Date(updatedAt), 'MMM dd, uuuu');
  const { username, image } = author;

  useEffect(() => {
    if (!articleFromState) {
      dispatch(fetchArticle(slug))
        .then((res) => res)
        .then((data) => {
          setArticle(data.payload.article);
        });
    } else {
      toggleLike(articleFromState.favorited);
      setLikeCount(articleFromState.favoritesCount);
      setArticle(articleFromState);
    }
    return () => {
      dispatch(resetArticleView());
      setArticle();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles['article-page']}>
      <HOCCommonBlock key={uuidv4()}>
        <div className={styles.header}>
          <ul className={styles.content}>
            <li className={styles['title-likes']}>
              <Link to={`/articles/${slug}`}>{title}</Link>
              <input
                className={styles['custom-checkbox']}
                disabled={!user}
                checked={like}
                type="checkbox"
                id={idCheck}
                name="like"
                value="likes"
                onChange={(e) => {
                  if (e.target.checked) {
                    toggleLike(!like);
                    setLikeCount(likeCount + 1);
                    dispatch(setLike(slug));
                  } else {
                    toggleLike(!like);
                    setLikeCount(likeCount - 1);
                    dispatch(deleteLike(slug));
                  }
                }}
              />
              <label htmlFor={idCheck} value="likes" disabled={!user} aria-hidden="true">
                {likeCount}
              </label>
            </li>
            <ul className={styles.tags}>
              {tagList.map((item) => (
                <li key={uuidv4()}>{item}</li>
              ))}
            </ul>
            <li className={styles.text}>{description}</li>
            <li>
              <ReactMarkdown className={styles['markdown-text']}>{body}</ReactMarkdown>
            </li>
          </ul>
          <ul>
            <ul className={styles['user-info']}>
              <ul>
                <li className={styles.nick}>{username}</li>
                <li className={styles.date}>{date}</li>
              </ul>
              <img className={styles.avatar} src={image} alt="avatar" />
            </ul>
            {user && user === username && (
              <ul className={styles['btn-block']}>
                <li>
                  <button
                    type="button"
                    className={styles.delete}
                    onClick={() => {
                      toggleHidden(true);
                    }}
                  >
                    Delete
                  </button>
                  {hidden && (
                    <div className={styles.confirmation}>
                      <div className={styles.text}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 1C4.13438 1 1 4.13438 1 8C1 11.8656 4.13438 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13438 11.8656 1 8 1ZM7.5 4.625C7.5 4.55625 7.55625 4.5 7.625 4.5H8.375C8.44375 4.5 8.5 4.55625 8.5 4.625V8.875C8.5 8.94375 8.44375 9 8.375 9H7.625C7.55625 9 7.5 8.94375 7.5 8.875V4.625ZM8 11.5C7.80374 11.496 7.61687 11.4152 7.47948 11.275C7.3421 11.1348 7.26515 10.9463 7.26515 10.75C7.26515 10.5537 7.3421 10.3652 7.47948 10.225C7.61687 10.0848 7.80374 10.004 8 10C8.19626 10.004 8.38313 10.0848 8.52052 10.225C8.6579 10.3652 8.73485 10.5537 8.73485 10.75C8.73485 10.9463 8.6579 11.1348 8.52052 11.275C8.38313 11.4152 8.19626 11.496 8 11.5Z"
                            fill="#FAAD14"
                          />
                        </svg>
                        <p>Are you sure to delete this article?</p>
                      </div>
                      <div className={styles.btns}>
                        <button
                          type="button"
                          className={styles['confirm-btn']}
                          onClick={() => {
                            toggleHidden(false);
                          }}
                        >
                          No
                        </button>
                        <button type="button" className={styles['confirm-btn']}>
                          <Link
                            to="/articles"
                            onClick={() => {
                              dispatch(deleteArticle(slug));
                              dispatch(setPage(1));
                              setTimeout(() => {
                                dispatch(fetchArticles({ page: 1 }));
                                dispatch(resetCreateArticle());
                              }, 100);
                            }}
                          >
                            Yes
                          </Link>
                        </button>
                      </div>
                    </div>
                  )}
                </li>
                <li>
                  <Link className={styles['edit-link']} to={`/articles/${slug}/edit`}>
                    Edit
                  </Link>
                </li>
              </ul>
            )}
          </ul>
        </div>
      </HOCCommonBlock>
    </div>
  );
}

export default ArticlePage;

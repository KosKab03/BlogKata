import styles from './HOCArticle.module.scss';

import HOCCommonBlock from './HOCCommonBlock';
import { fetchArticle, setLike, deleteLike } from '../articles-slice';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';

function HOCArticle(info) {
  const dispatch = useDispatch();
  const { title, description, tagList, favoritesCount, author, updatedAt, slug, favorited } = info;
  const [likeCount, setLikeCount] = useState(favoritesCount);
  const [like, toggleLike] = useState(favorited);
  const user = localStorage.getItem('username');
  const date = format(new Date(updatedAt), 'MMM dd, uuuu');

  const { username, image } = author;
  const idCheck = uuidv4();

  return (
    <HOCCommonBlock key={uuidv4()}>
      <div className={styles.header}>
        <ul className={styles.content}>
          <li className={styles['title-likes']}>
            <Link
              to={`/articles/${slug}`}
              onClick={() => {
                dispatch(fetchArticle);
              }}
            >
              {title}
            </Link>
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
        </ul>
        <ul>
          <ul className={styles['user-info']}>
            <ul>
              <li className={styles.nick}>{username}</li>
              <li className={styles.date}>{date}</li>
            </ul>
            <img className={styles.avatar} src={image} alt="avatar" />
          </ul>
        </ul>
      </div>
    </HOCCommonBlock>
  );
}

export default HOCArticle;

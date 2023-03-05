import styles from './HOCArticle.module.scss';

import { format } from 'date-fns';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function HOCArticle(info, oneElem = false) {
  const { title, description, tagList, favoritesCount, author, updatedAt, slug, body } = info;
  const date = format(new Date(updatedAt), 'MMM dd, uuuu');
  const { username, image } = author;
  const idCheck = uuidv4();

  return (
    <div key={uuidv4()} className={styles.item}>
      <div className={styles.header}>
        <ul className={styles.content}>
          <li className={styles['title-likes']}>
            <Link to={`/articles/${slug}`}>{title}</Link>
            <input className={styles['custom-checkbox']} type="checkbox" id={idCheck} name="like" value="likes" />
            <label
              htmlFor={idCheck}
              value="likes"
              onClick={() => {
                console.log('check');
              }}
              aria-hidden="true"
            >
              {favoritesCount}
            </label>
          </li>
          <ul className={styles.tags}>
            {tagList.map((item) => (
              <li key={uuidv4()}>{item}</li>
            ))}
          </ul>
          <li className={styles.text}>{description}</li>
          <li />
        </ul>
        <ul className={styles['user-info']}>
          <ul>
            <li className={styles.nick}>{username}</li>
            <li className={styles.date}>{date}</li>
          </ul>
          <img className={styles.avatar} src={image} alt="avatar" />
        </ul>
      </div>
      {oneElem && (
        <div>
          <ReactMarkdown className={styles['markdown-text']}>{body}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default HOCArticle;

import styles from './Header.module.scss';

import { getUserData, clearData } from '../../Store/LogIn';
import { fetchArticles, setPage } from '../../Store/ArticlesSlice';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
  const login = localStorage.getItem('username');
  const { username, image, token } = useSelector((state) => state.login.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (login) {
      dispatch(getUserData(login));
      dispatch(setPage(1));
      dispatch(fetchArticles({ page: 1, token }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, login]);

  const onLogOut = () => {
    localStorage.clear();
    dispatch(clearData());
  };

  return (
    <ul className={styles.header}>
      <li>
        <Link
          to="/articles"
          onClick={() => {
            dispatch(setPage(1));
            dispatch(fetchArticles({ page: 1, token }));
          }}
        >
          Realworld Blog
        </Link>
      </li>
      {login ? (
        <ul className={styles['login-header']}>
          <li>
            <Link to="/new-article" className={styles['create-article']}>
              Create article
            </Link>
          </li>
          <li>
            <Link className={styles['user-info']} to="/profile">
              <span>{username}</span>
              <img className={styles.avatar} src={image} alt="avatar" />
            </Link>
          </li>
          <li onClick={onLogOut} aria-hidden>
            <Link
              className={styles['log-out']}
              to="/articles"
              onClick={() => {
                dispatch(setPage(1));
                dispatch(fetchArticles({ page: 1, token: null }));
              }}
            >
              Log Out
            </Link>
          </li>
        </ul>
      ) : (
        <ul className={styles['btn-block']}>
          <li>
            <Link className={styles.btn} to="/sign-in">
              Sign In
            </Link>
          </li>
          <li>
            <Link className={styles.btn} to="/sign-up">
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </ul>
  );
}

export default Header;

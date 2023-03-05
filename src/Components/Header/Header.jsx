import styles from './Header.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <ul className={styles.header}>
      <li>
        <Link to="/articles">Realworld Blog</Link>
      </li>
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
    </ul>
  );
}

export default Header;

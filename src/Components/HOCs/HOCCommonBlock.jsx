import styles from './HOCCommonBlock.module.scss';
import React from 'react';

function HOCCommonBlock({ children }) {
  return <article className={styles.block}>{children}</article>;
}

export default HOCCommonBlock;

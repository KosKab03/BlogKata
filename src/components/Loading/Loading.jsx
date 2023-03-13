import styles from './Loading.module.scss';

import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;

function Loading() {
  return (
    <div className={styles.loading}>
      <Spin indicator={antIcon} />
    </div>
  );
}

export default Loading;

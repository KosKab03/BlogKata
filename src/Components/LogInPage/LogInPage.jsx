import styles from './LogInPage.module.scss';

import { postLoginUser } from '../../Store/LogIn';
import HOCAutorizated from '../HOCs/HOCAutorizated';

import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

function LogInPage({ type }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState({});
  const selectorData = useSelector((state) => state.login);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    setStatus(selectorData);
  }, [selectorData]);

  if (status.status === 'resolved') {
    return <Navigate to="/articles" />;
  }

  const onSubmit = (data) => {
    dispatch(postLoginUser(data));
  };

  return (
    <form className={styles.registration} onSubmit={handleSubmit(onSubmit)}>
      <h2>{type}</h2>
      <HOCAutorizated register={register} errors={errors} pageType={type} />
      {status.error && (
        <span style={{ color: 'red', fontSize: 12 }}>Wrong password or server problems, please try again</span>
      )}
      <button type="submit" className={styles.create}>
        Login
      </button>
      <div className={styles['have-account']}>
        <span>
          Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
        </span>
      </div>
    </form>
  );
}

export default LogInPage;

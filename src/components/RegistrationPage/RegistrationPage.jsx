import styles from './RegistrationPage.module.scss';

import { postDataOnServer, resetData } from '../../store/post-user-data';
import HOCAutorizated from '../../store/hoc/HOCAutorizated';

import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

function RegistrationPage({ type }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState({});
  const selectorData = useSelector((state) => state.postUserData);
  const username = localStorage.getItem('username');
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    setStatus(selectorData);
  }, [selectorData]);

  if (username) {
    return <Navigate to="/" />;
  }

  if (status.status === 'resolved') {
    return <Navigate to="/sign-in" />;
  }

  const onSubmit = (data) => {
    dispatch(postDataOnServer(data));
    dispatch(resetData());
    reset();
  };

  return (
    <form className={styles.registration} onSubmit={handleSubmit(onSubmit)}>
      <h2>{type}</h2>
      <HOCAutorizated register={register} errors={errors} pageType={type} />
      <hr />
      <div className={styles.agreement}>
        <input type="checkbox" required />
        <p>I agree to the processing of my personal information</p>
      </div>
      {status.error === '422' && (
        <span style={{ color: 'red', fontSize: 12 }}>
          A user with such data is already registered, try to <Link to="/sign-in">Sign In.</Link> or enter other data
        </span>
      )}
      <button type="submit" className={styles.create}>
        Create
      </button>
      <div className={styles['have-account']}>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </div>
    </form>
  );
}

export default RegistrationPage;

import styles from './EditProfilePage.module.scss';

import HOCAutorizated from '../../store/hoc/HOCAutorizated';
import { updUserData, getUserData } from '../../store/log-in';

import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function EditProfilePage({ type }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState({});
  const selectorData = useSelector((state) => state.login.status);

  const email = localStorage.getItem('email');
  const username = localStorage.getItem('username');
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username,
      email,
    },
  });

  useEffect(() => {
    setStatus(selectorData);
  }, [selectorData]);

  if (!username) {
    return <Navigate to="/sign-in" />;
  }

  const onSubmit = async (data) => {
    const { password, image } = data;
    if (password || image) {
      await dispatch(updUserData(data));
      await dispatch(getUserData(username));
      reset();
    }
  };

  return (
    <form className={styles.registration} onSubmit={handleSubmit(onSubmit)}>
      <h2>{type}</h2>
      <HOCAutorizated register={register} errors={errors} pageType={type} />
      {status.error === '422' && (
        <span style={{ color: 'red', fontSize: 12 }}>
          A user with such data is already registered, try to <Link to="/sign-in">Sign In.</Link> or enter other data
        </span>
      )}
      {status === 'loading' && <span>sending data to server...</span>}
      <button type="submit" className={styles.create}>
        Save
      </button>
    </form>
  );
}

export default EditProfilePage;

/* eslint-disable react/jsx-props-no-spreading */
import styles from './HOCAutorizated.module.scss';

import React from 'react';

function HOCAutorizated({ register, errors, pageType }) {
  const requiredPas = pageType !== 'Edit Profile';

  return (
    <ul className={styles['input-form']}>
      {(pageType === 'Create new account' || pageType === 'Edit Profile') && (
        <li>
          <label>
            Username
            <input
              placeholder="Username"
              {...register('username', {
                required: true,
                minLength: 3,
                maxLength: 20,
                pattern: {
                  value: /^[a-z][a-z0-9]*$/,
                  message: 'You can only use lowercase English letters and numbers',
                },
              })}
            />
            {errors.login && (
              <span style={{ color: 'red' }}>
                {errors.login.message || 'username must be between 3 and 20 characters'}
              </span>
            )}
          </label>
        </li>
      )}
      <li>
        <label>
          Email address
          <input
            placeholder="Email address"
            type="email"
            {...register('email', {
              required: true,
              pattern:
                /^[a-z][a-z0-9](([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && (
            <span style={{ color: 'red' }}>Incorrect mail data entry, first letters must be lowercase</span>
          )}
        </label>
      </li>
      <li>
        <label>
          {pageType === 'Edit Profile' ? 'New password' : 'Password'}
          <input
            placeholder="Password"
            type="password"
            {...register('password', {
              required: { requiredPas },
              minLength: 6,
              maxLength: 40,
            })}
          />
          {errors.password && <span style={{ color: 'red' }}>Your password needs to be at least 6 characters</span>}
        </label>
      </li>
      {pageType === 'Create new account' && (
        <li>
          <label>
            Repeat Password
            <input
              placeholder="Repeat Password"
              type="password"
              {...register('test', {
                required: true,
                validate: (value, formValues) => value === formValues.password,
              })}
            />
            {errors.test && <span style={{ color: 'red' }}>Passwords must match</span>}
          </label>
        </li>
      )}
      {pageType === 'Edit Profile' && (
        <li>
          <label>
            Avatar image (url)
            <input
              placeholder="Avatar image"
              type="text"
              {...register('image', {
                pattern: /^http.*\.(jpeg|jpg|gif|png)$/,
              })}
            />
            {errors.image && (
              <span style={{ color: 'red' }}>invalid data format, must be a link containing an image</span>
            )}
          </label>
        </li>
      )}
    </ul>
  );
}

export default HOCAutorizated;

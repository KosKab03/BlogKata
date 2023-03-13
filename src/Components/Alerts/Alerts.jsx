import React from 'react';
import { Alert } from 'antd';
import { Link } from 'react-router-dom';

const Alerts = {
  Error() {
    return (
      <Alert
        message="Error Text"
        description="Error Description Error Description Error Description Error Description Error Description Error Description"
        type="error"
      />
    );
  },

  Warning() {
    return (
      <Alert
        message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
        type="warning"
      />
    );
  },

  NotFound() {
    return (
      <span style={{ margin: '20px auto', width: 'fit-content', display: 'block' }}>
        this page does not exist, please go to the{' '}
        <Link to="/articles" style={{ color: 'green' }}>
          main page
        </Link>
      </span>
    );
  },
};

export const { Error } = Alerts;
export const { Warning } = Alerts;
export const { NotFound } = Alerts;

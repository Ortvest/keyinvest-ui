import { Fragment } from 'react';

import classNames from 'classnames';

import { ChangePasswordForm } from '@modules/Auth/ChangePassword/features/ChangePasswordForm';
import { Privacy } from '@modules/Auth/shared/Privacy';
import { ThemeToggle } from '@modules/Auth/ThemeToggle';

import './styles.css';

export const ChangePassword = (): JSX.Element => {
  return (
    <Fragment>
      <ThemeToggle />
      <div className={classNames('changepassword-in-container')}>
        <div className={classNames('form-container')}>
          <ChangePasswordForm />
          <Privacy />
        </div>
      </div>
    </Fragment>
  );
};

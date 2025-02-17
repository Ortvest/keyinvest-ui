import { Fragment } from 'react';

import classNames from 'classnames';

import { Privacy } from '@modules/Auth/shared/Privacy';
import { ThemeToggle } from '@modules/Auth/ThemeToggle';
import { SendResetInForm } from '@modules/SendPassword/features/SendResetInForm';

import './styles.css';

export const SendPassword = (): JSX.Element => {
  return (
    <Fragment>
      <ThemeToggle />
      <div className={classNames('sendpassword-in-container')}>
        <div className={classNames('form-container')}>
          <SendResetInForm />
          <Privacy />
        </div>
      </div>
    </Fragment>
  );
};

import { Fragment } from 'react';

import classNames from 'classnames';

import { Privacy } from '@modules/Auth/shared/Privacy';
import { ThemeToggle } from '@modules/Auth/ThemeToggle';
import { SentResetInForm } from '@modules/SentPassword/features/SentResetInForm';

import './styles.css';

export const SentPassword = (): JSX.Element => {
  return (
    <Fragment>
      <ThemeToggle />
      <div className={classNames('sentpassword-in-container')}>
        <div className={classNames('form-container')}>
          <SentResetInForm />
          <Privacy />
        </div>
      </div>
    </Fragment>
  );
};

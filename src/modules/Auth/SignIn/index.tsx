import { Fragment } from 'react';

import { Privacy } from '@modules/Auth/shared/Privacy';
import { SignInForm } from '@modules/Auth/SignIn/features/SignInForm';
import { ThemeToggle } from '@modules/Auth/ThemeToggle';

import './styles.css';

export const SignIn = (): JSX.Element => {
  return (
    <Fragment>
      <ThemeToggle />
      <div className="sign-in-container">
        <div className="form-container">
          <SignInForm />
          <Privacy />
        </div>
      </div>
    </Fragment>
  );
};

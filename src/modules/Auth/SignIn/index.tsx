import classNames from 'classnames';

import { SignInForm } from '@modules/Auth/SignIn/features/SignInForm';
import { ThemeToggle } from '@modules/Auth/ThemeToggle';

import './styles.css';

export const SignIn = (): JSX.Element => {
  return (
    <>
      <ThemeToggle />
      <div className={classNames('sign-in-container')}>
        <div className={classNames('side-spacer')} />

        <div className={classNames('form-container')}>
          <SignInForm />
        </div>

        <div className={classNames('side-spacer')} />
      </div>
    </>
  );
};

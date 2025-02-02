import classNames from 'classnames';

import { SignInForm } from '@modules/Auth/SignIn/features/SignInForm';

import './styles.css';

export const SignIn = () => {
  return (
    <div className={classNames('sign-in-container')}>
      <div className={classNames('side-spacer')} />

      <div className={classNames('form-container')}>
        <SignInForm />
      </div>

      <div className={classNames('side-spacer')} />
    </div>
  );
};

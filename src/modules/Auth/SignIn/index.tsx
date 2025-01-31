import classNames from 'classnames';

import { SignInForm } from '@modules/Auth/SignIn/features/SignInForm';

import './styles.css';

export const SignIn = () => {
  return (
    <div className={classNames('gridContainer')}>
      <div className={classNames('gridItem')} />

      <div className={classNames('gridItem')}>
        <SignInForm />
      </div>

      <div className={classNames('gridItem')} />
    </div>
  );
};

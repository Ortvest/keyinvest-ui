import classNames from 'classnames';

import { ThemeToggle } from '@modules/Auth/ThemeToggle';
import { ChangePasswordForm } from '@modules/ChangePassword/features/ChangePasswordForm';

import './styles.css';

export const ChangePassword = (): JSX.Element => {
  return (
    <>
      <ThemeToggle />
      <div className={classNames('changepassword-in-container')}>
        <div className={classNames('side-spacer')} />

        <div className={classNames('form-container')}>
          <ChangePasswordForm />
        </div>

        <div className={classNames('side-spacer')} />
      </div>
    </>
  );
};

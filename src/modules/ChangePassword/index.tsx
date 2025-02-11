import classNames from 'classnames';

import { ChangePasswordForm } from '@modules/ChangePassword/features/ChangePasswordForm';

import './styles.css';

export const ChangePassword = () => {
  return (
    <div className={classNames('changepassword-in-container')}>
      <div className={classNames('side-spacer')} />

      <div className={classNames('form-container')}>
        <ChangePasswordForm />
      </div>

      <div className={classNames('side-spacer')} />
    </div>
  );
};

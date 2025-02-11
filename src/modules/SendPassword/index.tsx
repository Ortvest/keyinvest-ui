import classNames from 'classnames';

import { SendResetInForm } from '@modules/SendPassword/features/SendResetInForm';

import './styles.css';

export const SendPassword = () => {
  return (
    <div className={classNames('sendpassword-in-container')}>
      <div className={classNames('side-spacer')} />

      <div className={classNames('form-container')}>
        <SendResetInForm />
      </div>

      <div className={classNames('side-spacer')} />
    </div>
  );
};

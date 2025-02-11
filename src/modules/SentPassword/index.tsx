import classNames from 'classnames';

import { SentResetInForm } from '@modules/SentPassword/features/SentResetInForm';

import './styles.css';

export const SentPassword = () => {
  return (
    <div className={classNames('sentpassword-in-container')}>
      <div className={classNames('side-spacer')} />

      <div className={classNames('form-container')}>
        <SentResetInForm />
      </div>

      <div className={classNames('side-spacer')} />
    </div>
  );
};

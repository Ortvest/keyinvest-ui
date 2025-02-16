import classNames from 'classnames';

import { ThemeToggle } from '@modules/Auth/ThemeToggle';
import { SentResetInForm } from '@modules/SentPassword/features/SentResetInForm';

import './styles.css';

export const SentPassword = (): JSX.Element => {
  return (
    <>
      <ThemeToggle />
      <div className={classNames('sentpassword-in-container')}>
        <div className={classNames('side-spacer')} />

        <div className={classNames('form-container')}>
          <SentResetInForm />
        </div>

        <div className={classNames('side-spacer')} />
      </div>
    </>
  );
};

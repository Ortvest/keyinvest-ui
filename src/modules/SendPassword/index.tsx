import classNames from 'classnames';

import { ThemeToggle } from '@modules/Auth/ThemeToggle';
import { SendResetInForm } from '@modules/SendPassword/features/SendResetInForm';

import './styles.css';

export const SendPassword = (): JSX.Element => {
  return (
    <>
      <ThemeToggle />
      <div className={classNames('sendpassword-in-container')}>
        <div className={classNames('side-spacer')} />

        <div className={classNames('form-container')}>
          <SendResetInForm />
        </div>

        <div className={classNames('side-spacer')} />
      </div>
    </>
  );
};

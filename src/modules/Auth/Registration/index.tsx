import classNames from 'classnames';

import { RegistrationForm } from '@modules/Auth/Registration/features/RegistrationForm';
import { Privacy } from '@modules/Auth/shared/Privacy';
import { ThemeToggle } from '@modules/Auth/ThemeToggle';

import './styles.css';

export const Registration = (): JSX.Element => {
  return (
    <>
      <ThemeToggle />
      <div className={classNames('registration-wrapper')}>
        <RegistrationForm />
        <Privacy />
      </div>
    </>
  );
};

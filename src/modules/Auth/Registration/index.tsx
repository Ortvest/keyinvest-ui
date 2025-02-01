import classNames from 'classnames';

import { Privacy } from '@modules/Auth/Registration/features/Privacy';
import { RegistrationForm } from '@modules/Auth/Registration/features/RegistrationForm';
import { AuthHeader } from '@modules/Auth/shared/Header';

import './styles.css';

export const Registration = (): JSX.Element => {
  return (
    <div className={classNames('registration-wrapper')}>
      <AuthHeader title={'Create an account'} />
      <RegistrationForm />
      <Privacy />
    </div>
  );
};

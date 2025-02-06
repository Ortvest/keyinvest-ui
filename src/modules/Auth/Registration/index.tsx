import classNames from 'classnames';

import { RegistrationForm } from '@modules/Auth/Registration/features/RegistrationForm';
import { AuthHeader } from '@modules/Auth/shared/Header';
import { Privacy } from '@modules/Auth/shared/Privacy';

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

import { RegistrationForm } from '@modules/Modals/Registration/features/RegistrationForm';
import './styles.css';
import { AuthHeader } from '@modules/Modals/shared/Header';
import classNames from 'classnames';
import { Privacy } from '@modules/Modals/Registration/features/Privacy';
export const RegistrationModal = () => {
  return (
    <div className={classNames('app-container')}>
      <AuthHeader title={'Create an account'} />
      <RegistrationForm />
      <Privacy />
    </div>
  );
};

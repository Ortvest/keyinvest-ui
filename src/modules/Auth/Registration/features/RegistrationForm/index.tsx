import { useState } from 'react';

import classNames from 'classnames';

import { RegistrationNavigation } from '@modules/Auth/Registration/layout/RegistrationNavigation';
import { RegistrationSteps } from '@modules/Auth/Registration/layout/RegistrationSteps';

import './styles/styles.css';

type Step = 'email' | 'password' | 'confirmation';

export const RegistrationForm = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<Step>('email');

  const isPasswordMatch = password === confirmPassword;

  const onContinueHandler = (): void => {
    setStep((prev) => (prev === 'email' ? 'password' : prev === 'password' ? 'confirmation' : prev));
  };

  const onGoBackHandler = (): void => {
    setStep((prev) => {
      if (prev === 'password') {
        setEmail('');
        setPassword('');
        return 'email';
      } else if (prev === 'confirmation') {
        setPassword('');
        setConfirmPassword('');
        return 'password';
      }
      return prev;
    });
  };

  return (
    <form>
      <div className={classNames('form-wrapper')}>
        <div className={classNames('inputs-container')}>
          <RegistrationSteps
            step={step}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        </div>
        <RegistrationNavigation
          step={step}
          isPasswordMatch={isPasswordMatch}
          onContinue={onContinueHandler}
          onGoBack={onGoBackHandler}
        />
      </div>
    </form>
  );
};

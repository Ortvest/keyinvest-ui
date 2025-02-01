import { useState } from 'react';

import classNames from 'classnames';

import { RegistrationNavigation } from '@modules/Auth/Registration/layout/RegistrationNavigation';
import { RegistrationSteps } from '@modules/Auth/Registration/layout/RegistrationSteps';

import './styles/styles.css';

type Step = 1 | 2 | 3;

export const RegistrationForm = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<Step>(1);

  const isPasswordMatch = password === confirmPassword;

  const onContinueHandler = (): void => setStep((prev) => (prev < 3 ? ((prev + 1) as Step) : prev));

  const onGoBackHandler = (): void => {
    setStep((prev) => {
      if (prev === 2) {
        setEmail('');
        setPassword('');
      } else if (prev === 3) {
        setPassword('');
        setConfirmPassword('');
      }
      return prev > 1 ? ((prev - 1) as Step) : prev;
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

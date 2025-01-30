import { InputField } from '@modules/Modals/Registration/features/InputField';
import { PasswordField } from '@modules/Modals/Registration/features/PasswordField';
import classNames from 'classnames';
import { useState } from 'react';
import './styles/styles.css';
import { PasswordValidation } from '@modules/Modals/Registration/features/PasswordValidation';
import { validatePassword } from '@shared/validations/validators/validatePassword';
import { isEmailValid } from '@shared/validations/validators/isEmailValid';
import { SocialAuth } from '@modules/Modals/Registration/features/SocialAuth';
import { HaveAccount } from '@modules/Modals/Registration/features/HaveAccount';

export const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);

  const emailValid = isEmailValid(email);
  const { isPasswordValid } = validatePassword(password);
  const isPasswordMatch = password === confirmPassword;

  const onContinueHandler = () => {
    if (step === 1 && emailValid) {
      setStep(2);
    } else if (step === 2 && isPasswordValid) {
      setStep(3);
    }
  };

  const onGoBackHandler = () => {
    setStep((prevStep) => {
      if (prevStep === 2) {
        setEmail('');
      } else if (prevStep === 3) {
        setPassword('');
        setConfirmPassword('');
      }
      return prevStep > 1 ? prevStep - 1 : prevStep;
    });
  };

  return (
    <form>
      <div className={classNames('form-container')}>
        <div className={classNames('inputs-container')}>
          {/* Step 1: Email Input */}
          {step >= 1 && <InputField value={email} onChange={(e) => setEmail(e.target.value)} />}

          {/* Step 2: Password Input   */}
          {step >= 2 && (
            <PasswordField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          )}

          {/* Step 3: Confirm Password Input */}
          {step >= 3 && (
            <PasswordField
              label="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              checkMatch={true}
              mainPassword={password}
            />
          )}
        </div>

        {/* Password Validation */}
        {step >= 2 && <PasswordValidation password={password} />}

        {/* Continue Button */}
        {step < 3 ? (
          <button
            className={classNames('submit-button')}
            disabled={(step === 1 && !emailValid) || (step === 2 && !isPasswordValid)}
            onClick={(e) => {
              e.preventDefault();
              onContinueHandler();
            }}>
            Continue
          </button>
        ) : (
          <button className={classNames('submit-button')} disabled={!isPasswordValid || !isPasswordMatch}>
            Submit
          </button>
        )}

        {step === 1 && (
          <>
            <HaveAccount />
            <SocialAuth />
          </>
        )}

        {step >= 2 && (
          <a
            href="#"
            className={classNames('back-link')}
            onClick={(e) => {
              e.preventDefault();
              onGoBackHandler();
            }}>
            Go Back
          </a>
        )}
      </div>
    </form>
  );
};

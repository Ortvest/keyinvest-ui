import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@global/store';
import { nextStep, prevStep, setConfirmPassword, setEmail, setPassword } from '@global/store/slices/registration.slice';

import { PasswordField } from '@modules/Auth/Registration/features/PasswordField';
import { SignInLink } from '@modules/Auth/Registration/features/SignInLink';
import { SocialAuth } from '@modules/Auth/Registration/features/SocialAuth';
import { InputEmailField } from '@modules/Auth/shared/InputEmailField';

import './styles/styles.css';

export const RegistrationForm = (): JSX.Element => {
  const dispatch = useDispatch();

  const { email, password, confirmPassword, step } = useSelector((state: RootState) => state.registration);

  const isPasswordMatch = password === confirmPassword;

  const onContinueHandler = (): void => {
    if (step === 1) {
      dispatch(nextStep());
    } else if (step === 2) {
      dispatch(nextStep());
    }
  };

  const onGoBackHandler = (): void => {
    dispatch(prevStep());
    if (step === 2) {
      dispatch(setEmail(''));
    } else if (step === 3) {
      dispatch(setPassword(''));
      dispatch(setConfirmPassword(''));
    }
  };

  return (
    <form>
      <div className={classNames('form-wrapper')}>
        <div className={classNames('inputs-container')}>
          {/* Step 1: Email Input */}
          {step >= 1 && <InputEmailField value={email} onChange={(e) => dispatch(setEmail(e.target.value))} />}

          {/* Step 2: Password Input */}
          {step >= 2 && (
            <PasswordField label="Password" value={password} onChange={(e) => dispatch(setPassword(e.target.value))} />
          )}

          {/* Step 3: Confirm Password Input */}
          {step >= 3 && (
            <PasswordField
              label="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
              checkMatch={true}
              mainPassword={password}
            />
          )}
        </div>

        {/* Continue Button */}
        {step < 3 ? (
          <button
            className={classNames('submit-button')}
            onClick={(e) => {
              e.preventDefault();
              onContinueHandler();
            }}>
            Continue
          </button>
        ) : (
          <button className={classNames('submit-button')} disabled={!isPasswordMatch}>
            Submit
          </button>
        )}

        {step === 1 && (
          <>
            <SignInLink />
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

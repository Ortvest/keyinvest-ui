import classNames from 'classnames';

import { PasswordField } from '@modules/Auth/Registration/features/PasswordField';
import { VerificationCodeInput } from '@modules/Auth/Registration/features/VerificationCodeInput';
import { InputEmailField } from '@modules/Auth/shared/InputEmailField';
import { InputUsernameField } from '@modules/Auth/shared/InputUsernameField';
import { StepNames } from '@modules/Auth/shared/types/stepNames';

import './styles/styles.css';

type FormState = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
  step: StepNames;
};

type RegistrationStepsProps = {
  formState: FormState;
  handleChange: (key: keyof FormState, value: string) => void;
};

export const RegistrationSteps = ({ formState, handleChange }: RegistrationStepsProps): JSX.Element => (
  <>
    {formState.step === StepNames.EMAIL && (
      <InputEmailField value={formState.email} onChange={(e) => handleChange('email', e.target.value)} />
    )}

    {formState.step === StepNames.VERIFICATION && (
      <>
        <p className={classNames('confirm-email-text')}>{formState.email}</p>
        <VerificationCodeInput
          verificationCode={formState.verificationCode}
          onVerificationCodeChange={(newCode) => handleChange('verificationCode', newCode)}
        />
      </>
    )}

    {(formState.step === StepNames.USERNAME ||
      formState.step === StepNames.PASSWORD ||
      formState.step === StepNames.CONFIRMATION) && (
      <InputUsernameField value={formState.username} onChange={(e) => handleChange('username', e.target.value)} />
    )}

    {(formState.step === StepNames.PASSWORD || formState.step === StepNames.CONFIRMATION) && (
      <PasswordField
        label="Password"
        value={formState.password}
        onChange={(e) => handleChange('password', e.target.value)}
      />
    )}

    {formState.step === StepNames.CONFIRMATION && (
      <PasswordField
        label="Re-enter Password"
        value={formState.confirmPassword}
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
        checkMatch={true}
        mainPassword={formState.password}
      />
    )}
  </>
);

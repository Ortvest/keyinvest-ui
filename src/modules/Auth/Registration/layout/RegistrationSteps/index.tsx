import { PasswordField } from '@modules/Auth/Registration/features/PasswordField';
import { InputEmailField } from '@modules/Auth/shared/InputEmailField';
import { InputUsernameField } from '@modules/Auth/shared/InputUsernameField';
import { StepNames } from '@modules/Auth/shared/types/stepNames';

type FormState = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  step: StepNames;
};

type RegistrationStepsProps = {
  formState: FormState;
  handleChange: (key: keyof FormState, value: string) => void;
};

export const RegistrationSteps = ({ formState, handleChange }: RegistrationStepsProps): JSX.Element => (
  <>
    {/* Email остаётся на всех шагах */}
    <InputEmailField value={formState.email} onChange={(e) => handleChange('email', e.target.value)} />

    {/* Username появляется после нажатия Continue на email */}
    {(formState.step === StepNames.USERNAME ||
      formState.step === StepNames.PASSWORD ||
      formState.step === StepNames.CONFIRMATION) && (
      <InputUsernameField value={formState.username} onChange={(e) => handleChange('username', e.target.value)} />
    )}

    {/* Password появляется только после username */}
    {(formState.step === StepNames.PASSWORD || formState.step === StepNames.CONFIRMATION) && (
      <PasswordField
        label="Password"
        value={formState.password}
        onChange={(e) => handleChange('password', e.target.value)}
      />
    )}

    {/* Подтверждение пароля на последнем шаге */}
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

import { PasswordField } from '@modules/Auth/Registration/features/PasswordField';
import { InputEmailField } from '@modules/Auth/shared/InputEmailField';

type Step = 'email' | 'password' | 'confirmation';

type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
  step: Step;
};

type RegistrationStepsProps = {
  formState: FormState;
  handleChange: (key: keyof FormState, value: string) => void;
};

export const RegistrationSteps = ({ formState, handleChange }: RegistrationStepsProps): JSX.Element => (
  <>
    <InputEmailField value={formState.email} onChange={(e) => handleChange('email', e.target.value)} />
    {formState.step !== 'email' && (
      <PasswordField
        label="Password"
        value={formState.password}
        onChange={(e) => handleChange('password', e.target.value)}
      />
    )}
    {formState.step === 'confirmation' && (
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

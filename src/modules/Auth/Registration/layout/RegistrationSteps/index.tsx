import { PasswordField } from '@modules/Auth/Registration/features/PasswordField';
import { InputEmailField } from '@modules/Auth/shared/InputEmailField';

type Step = 'email' | 'password' | 'confirmation';

type RegistrationStepsProps = {
  step: Step;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
};

export const RegistrationSteps = ({
  step,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: RegistrationStepsProps): JSX.Element => (
  <>
    <InputEmailField value={email} onChange={(e) => setEmail(e.target.value)} />
    {step !== 'email' && (
      <PasswordField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    )}
    {step === 'confirmation' && (
      <PasswordField
        label="Re-enter Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        checkMatch={true}
        mainPassword={password}
      />
    )}
  </>
);

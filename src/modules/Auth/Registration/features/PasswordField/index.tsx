import { useState } from 'react';

import classNames from 'classnames';

import EyeClosed from '@shared/assets/icons/EyeClosed.svg';
import EyeOpen from '@shared/assets/icons/EyeOpen.svg';

import './styles/styles.css';

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkMatch?: boolean;
  mainPassword?: string;
}

export const PasswordField = ({
  label,
  value,
  onChange,
  checkMatch,
  mainPassword,
}: PasswordFieldProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const isValid = checkMatch ? value === mainPassword : true;

  return (
    <div className={classNames('password-container')}>
      <div className={classNames('input-wrapper')}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={label}
          value={value}
          name="password"
          onChange={onChange}
          className={classNames('password-field', { invalid: !isValid })}
        />
        <button type="button" onClick={toggleVisibility} className={classNames('toggle-button')}>
          <img src={showPassword ? EyeOpen : EyeClosed} alt={showPassword ? 'Hide password' : 'Show password'} />
        </button>
      </div>
      {!isValid && <p className={classNames('error-text')}>Re-password is not valid</p>}
    </div>
  );
};

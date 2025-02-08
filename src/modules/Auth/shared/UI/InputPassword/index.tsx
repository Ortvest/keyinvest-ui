import { useState } from 'react';

import classNames from 'classnames';

import IconEyeOff from '@shared/assets/icons/EyeClosed.svg';
import IconEye from '@shared/assets/icons/EyeOpen.svg';

import './styles/styles.css';

interface InputPasswordProps {
  password: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
  className?: string;
}

export const InputPassword = ({
  password,
  onPasswordChange,
  placeholder,
  name,
  className,
}: InputPasswordProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-input-group">
      <input
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={onPasswordChange}
        placeholder={placeholder}
        name={name}
        className={classNames('input', className)}
      />
      <button type="button" className="toggle-button" onClick={togglePasswordVisibility}>
        <img src={showPassword ? IconEye : IconEyeOff} alt="Toggle password visibility" className="input-icon" />
      </button>
    </div>
  );
};

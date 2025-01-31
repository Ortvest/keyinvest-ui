import { useState } from 'react';

import classNames from 'classnames';

import eye from '@shared/assets/icons/eye-off.svg';
import eyeoff from '@shared/assets/icons/eye-open.png';

import './styles/styles.css';

interface InputPasswordProps {
  password: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
  className?: string;
}

export const InputPassword = ({ password, onPasswordChange, placeholder, name, className }: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-group">
      <input
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={onPasswordChange}
        placeholder={placeholder}
        name={name}
        className={classNames('input', className)}
      />
      <button type="button" className="input-icon-button" onClick={togglePasswordVisibility}>
        <img src={showPassword ? eyeoff : eye} alt="Toggle password visibility" className="input-icon" />
      </button>
    </div>
  );
};

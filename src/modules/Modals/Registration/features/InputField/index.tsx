import classNames from 'classnames';
import React from 'react';
import './styles/styles.css';
interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({ value, onChange }: InputFieldProps) => {
  return (
    <input
      type="email"
      placeholder="your@mail.com"
      value={value}
      name="email"
      onChange={onChange}
      className={classNames('input-field')}
    />
  );
};

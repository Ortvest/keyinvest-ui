import classNames from 'classnames';

import './styles/styles.css';

interface EmailInputProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const EmailInput = ({ email, onChange, className }: EmailInputProps) => {
  return (
    <div className="auth-form-control">
      <input
        className={classNames('input', className)}
        name="email"
        type="email"
        placeholder="Email address"
        value={email}
        onChange={onChange}
      />
    </div>
  );
};

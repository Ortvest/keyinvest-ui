import classNames from 'classnames';

import './styles/styles.css';

interface InputEmailFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputEmailField = ({ value, onChange, ...rest }: InputEmailFieldProps): JSX.Element => {
  return (
    <input
      type="email"
      placeholder="Email address"
      value={value}
      name="email"
      onChange={onChange}
      className={classNames('input-email-field')}
      {...rest}
    />
  );
};

import classNames from 'classnames';

import './styles/styles.css';

type InputUsernameFieldProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputUsernameField = ({ value, onChange }: InputUsernameFieldProps): JSX.Element => {
  return (
    <input
      type="text"
      placeholder="Username"
      name="userfield"
      id="username"
      value={value}
      onChange={onChange}
      className={classNames('username-field')}
    />
  );
};

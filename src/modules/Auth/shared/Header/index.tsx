import classNames from 'classnames';

import LogoIcon from '@shared/assets/icons/LogoIcon.svg';

import './styles/styles.css';

interface AuthHeaderProps {
  title: string;
}

export const AuthHeader = ({ title }: AuthHeaderProps): JSX.Element => {
  return (
    <div className={classNames('auth-header-wrapper')}>
      <img src={LogoIcon} alt="App logo" />
      <h2>{title}</h2>
    </div>
  );
};

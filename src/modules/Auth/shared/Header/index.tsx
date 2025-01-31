import classNames from 'classnames';

import Logo from '@shared/assets/icons/Logo.png';

import './styles/styles.css';

interface AuthHeaderProps {
  title: string;
}

export const AuthHeader = ({ title }: AuthHeaderProps) => {
  return (
    <div className={classNames('auth-header')}>
      <div className={classNames('logo-container')}>
        <img src={Logo} className={classNames('logo')} alt="Logo" />
      </div>
      <h1 className={classNames('title')}>{title}</h1>
    </div>
  );
};

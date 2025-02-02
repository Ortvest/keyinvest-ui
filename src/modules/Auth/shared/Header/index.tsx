import classNames from 'classnames';

import AppIcon from '@shared/assets/icons/LogoIcon.svg';

import './styles/styles.css';

interface AuthHeaderProps {
  title: string;
}

export const AuthHeader = ({ title }: AuthHeaderProps) => {
  return (
    <div className={classNames('auth-header')}>
      <div className={classNames('logo-container')}>
        <img src={AppIcon} className={classNames('logo')} alt="Logo" />
      </div>
      <h1 className={classNames('auth-title')}>{title}</h1>
    </div>
  );
};

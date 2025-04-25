import classNames from 'classnames';

import LogoIcon from '@shared/assets/icons/EmblemIcon.svg';

import './styles/styles.css';

interface AuthHeaderProps {
  title: string;
}

export const AuthHeader = ({ title }: AuthHeaderProps): JSX.Element => {
  return (
    <div className={classNames('auth-header-wrapper')}>
      <img className={classNames('auth-header-logo')} src={LogoIcon} alt="App logo" />
      <h2 className={classNames('auth-header-title')}>{title}</h2>
    </div>
  );
};

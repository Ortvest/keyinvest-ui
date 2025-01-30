import LogoIcon from '@shared/assets/icons/LogoIcon.svg';
import classNames from 'classnames';
import './styles/styles.css';

interface AuthHeaderProps {
  title: string;
}

export const AuthHeader = ({ title }: AuthHeaderProps) => {
  return (
    <div className={classNames('authHeader')}>
      <img src={LogoIcon} alt="App logo" />
      <h2>{title}</h2>
    </div>
  );
};

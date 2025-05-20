import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import './styles/styles.css';

interface UserIconProps {
  username?: string;
  onClickPath?: string;
}

export const UserIcon = ({ username, onClickPath }: UserIconProps): JSX.Element | null => {
  const navigate = useNavigate();

  if (!username) return null;

  const firstLetter = username.charAt(0).toUpperCase();

  const getStableColor = (input: string): string => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `#${(hash & 0x00ffffff).toString(16).toUpperCase().padStart(6, '0')}`;
  };

  const backgroundColor = getStableColor(username);

  const onHandleClick: React.MouseEventHandler<HTMLDivElement> = (): void => {
    navigate(onClickPath ?? AppRoutes.SYSTEM.path);
  };

  return (
    <div className="user-icon" style={{ backgroundColor }} onClick={onHandleClick} title="Personal account">
      {firstLetter}
    </div>
  );
};

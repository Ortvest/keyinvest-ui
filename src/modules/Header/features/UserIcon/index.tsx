import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import './styles/styles.css';

interface UserIconProps {
  email: string;
}

export const UserIcon = ({ email }: UserIconProps): JSX.Element => {
  const navigate = useNavigate();
  const firstLetter = email.charAt(0).toUpperCase();

  const getStableColor = (input: string): string => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `#${(hash & 0x00ffffff).toString(16).toUpperCase().padStart(6, '0')}`;
    return color;
  };

  const backgroundColor = getStableColor(email);

  const onHandleClick: React.MouseEventHandler<HTMLDivElement> = (): void => {
    navigate(AppRoutes.SYSTEM.path);
  };

  return (
    <div className="user-icon" style={{ backgroundColor }} onClick={onHandleClick}>
      {firstLetter}
    </div>
  );
};

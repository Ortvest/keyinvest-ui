import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { RootState } from '@global/store';

import { UserIcon } from '@modules/Header/features/UserIcon';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import Bell from '@shared/assets/icons/bell.svg';
import Logo from '@shared/assets/icons/EmblemIcon.svg';
import File from '@shared/assets/icons/File.svg';
import Folder from '@shared/assets/icons/folder.svg';
import Quest from '@shared/assets/icons/quest.svg';
import Robot from '@shared/assets/icons/robot.svg';

import './styles/styles.css';

const sidebarItems = [
  { id: 'file', icon: File, alt: 'File', route: '/system/briefing' },
  { id: 'folder', icon: Folder, alt: 'Folder', route: '/system/templates' },
  { id: 'bell', icon: Bell, alt: 'Notifications', route: '/system/notifications' },
  { id: 'robot', icon: Robot, alt: 'Robot', route: '/system/ai-assistant' },
];

export const Sidebar = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('file');
  const user = useTypedSelector((state: RootState) => state.login.user);

  useEffect(() => {
    const currentRoute = sidebarItems.find((item) => item.route === location.pathname);
    if (currentRoute) setActiveItem(currentRoute.id);
  }, [location.pathname]);

  const handleNavigation = (id: string, route: string): void => {
    setActiveItem(id);
    navigate(route);
  };

  return (
    <aside className={classNames('brief-sidebar-wrapper')} aria-label="Sidebar navigation">
      <div className={classNames('brief-sidebar-column')}>
        <img className={classNames('brief-sidebar-logo')} src={Logo} alt="App logo" />
      </div>

      <nav className={classNames('brief-sidebar-links')}>
        <ul className={classNames('brief-sidebar-list')}>
          {sidebarItems.map(({ id, icon, alt, route }) => (
            <li key={id}>
              <button
                className={classNames('brief-sidebar-item', { active: activeItem === id })}
                onClick={() => handleNavigation(id, route)}
                aria-label={alt}
                aria-current={activeItem === id ? 'page' : undefined}>
                <img className={classNames('sidebar-list-icon')} src={icon} alt={alt} />
              </button>
            </li>
          ))}
        </ul>

        <div className={classNames('brief-sidebar-quest-avatar')}>
          <button
            className={classNames('brief-sidebar-quest', { active: activeItem === 'quest' })}
            onClick={() => setActiveItem('quest')}
            aria-label="Help"
            aria-current={activeItem === 'quest' ? 'page' : undefined}>
            <img className={classNames('sidebar-list-icon')} src={Quest} alt="Help" />
          </button>

          <div className={classNames('sidebar-list-avatar')}>{user ? <UserIcon email={user.email} /> : null}</div>
        </div>
      </nav>
    </aside>
  );
};

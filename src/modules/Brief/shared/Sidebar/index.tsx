import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { RootState } from '@global/store';
import { setUser } from '@global/store/slices/login.slice';

import { UserIcon } from '@modules/Header/features/UserIcon';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import Bell from '@shared/assets/icons/bell.svg';
import File from '@shared/assets/icons/File.svg';
import Folder from '@shared/assets/icons/folder.svg';
import Logo from '@shared/assets/icons/IconLogo.svg';
import Quest from '@shared/assets/icons/quest.svg';
import Robot from '@shared/assets/icons/robot.svg';

import './styles/styles.css';

const sidebarItems = [
  { id: 'file', icon: File, alt: 'File' },
  { id: 'folder', icon: Folder, alt: 'Folder' },
  { id: 'bell', icon: Bell, alt: 'Notifications' },
  { id: 'robot', icon: Robot, alt: 'Robot' },
];

export const Sidebar = (): JSX.Element => {
  const [activeItem, setActiveItem] = useState('file');
  const user = useTypedSelector((state: RootState) => state.login.user);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      dispatch(setUser(parsedUser));
    }
  }, [dispatch]);

  return (
    <aside className="brief-sidebar-wrapper" aria-label="Sidebar navigation">
      <div className="brief-sidebar-column">
        <img className="brief-sidebar-logo" src={Logo} alt="App logo" />
      </div>

      <nav className="brief-sidebar-links">
        <ul className="brief-sidebar-list">
          {sidebarItems.map(({ id, icon, alt }) => (
            <li key={id}>
              <button
                className={classNames('brief-sidebar-item', { active: activeItem === id })}
                onClick={() => setActiveItem(id)}
                aria-label={alt}
                aria-current={activeItem === id ? 'true' : undefined}>
                <img className="sidebar-list-icon" src={icon} alt={alt} />
              </button>
            </li>
          ))}
        </ul>

        <div className="brief-sidebar-quest-avatar">
          <button
            className={classNames('brief-sidebar-quest', { active: activeItem === 'quest' })}
            onClick={() => setActiveItem('quest')}
            aria-label="Help"
            aria-current={activeItem === 'quest' ? 'true' : undefined}>
            <img className="sidebar-list-icon" src={Quest} alt="Help" />
          </button>

          <div className="sidebar-list-avatar">{user ? <UserIcon email={user.email} /> : null}</div>
        </div>
      </nav>
    </aside>
  );
};

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import './styles/styles.css';

export const GetStartedButton = (): JSX.Element => {
  const navigate = useNavigate();

  const onHandleClick = () => {
    navigate(AppRoutes.AUTH_LOG_IN.path);
  };

  return (
    <button className={classNames('get-started-button')} onClick={onHandleClick}>
      Get Started
    </button>
  );
};

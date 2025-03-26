import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import ArrowRight from '@shared/assets/icons/arrow-right.svg';

import './styles/styles.css';

interface LendingButtonProps {
  title: string;
}

export const LendingButton = ({ title }: LendingButtonProps): JSX.Element => {
  const navigate = useNavigate();

  const onHandleClick = (): void => {
    navigate(AppRoutes.AUTH_LOG_IN.path);
  };

  return (
    <button className={classNames('get-started-main-button')} type="button" onClick={onHandleClick}>
      <div className={classNames('button-text-arrow')}>
        <p>{title}</p>
        <img src={ArrowRight} alt="arrow icon" />
      </div>
    </button>
  );
};

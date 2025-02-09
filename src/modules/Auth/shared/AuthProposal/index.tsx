import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import './styles/styles.css';

interface AuthProposalProps {
  type: 'signin' | 'signup' | 'refresh-password';
}

export const AuthProposal = ({ type }: AuthProposalProps): JSX.Element => {
  const navigate = useNavigate();

  const handleNavigation = (): void => {
    if (type === 'signin') {
      navigate(AppRoutes.AUTH_LOG_IN.path);
    } else if (type === 'signup') {
      navigate(AppRoutes.AUTH_REGISTER.path);
    } else {
      navigate(AppRoutes.AUTH_SEND_PASSWORD_RESET.path);
    }
  };

  return (
    <div className={classNames('auth-proposal', 'text-center')}>
      {type === 'signin' ? (
        <p className="text-description auth-proposal-signin">
          You don’t have an account?
          <Link to={AppRoutes.AUTH_REGISTER.path} className="link-signup" onClick={handleNavigation}>
            Sign Up
          </Link>
        </p>
      ) : type === 'signup' ? (
        <p className="text-description auth-proposal-signin">
          Already have an account?
          <Link to={AppRoutes.AUTH_LOG_IN.path} className="link-signin" onClick={handleNavigation}>
            Sign In
          </Link>
        </p>
      ) : type === 'refresh-password' ? (
        <p className="text-description text-flex">
          <span>Forgot password?</span>
          <a href={AppRoutes.AUTH_SEND_PASSWORD_RESET.path} className="link-restore" onClick={handleNavigation}>
            Restore
          </a>
        </p>
      ) : null}
    </div>
  );
};

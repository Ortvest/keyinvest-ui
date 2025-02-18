import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { AuthTypes } from '@modules/Auth/shared/types/authTypes';

import './styles/styles.css';

interface AuthProposalProps {
  type: keyof typeof AuthTypes;
}

export const AuthProposal = ({ type }: AuthProposalProps): JSX.Element => {
  const navigate = useNavigate();

  const authRoutes: Record<keyof typeof AuthTypes, string> = {
    [AuthTypes.SIGN_IN]: AppRoutes.AUTH_LOG_IN.path,
    [AuthTypes.SIGN_UP]: AppRoutes.AUTH_REGISTER.path,
    [AuthTypes.REFRESH_PASSWORD]: AppRoutes.AUTH_SEND_PASSWORD_RESET.path,
  };

  const handleNavigation = (): void => {
    const path = authRoutes[type];
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className={classNames('auth-proposal', 'text-center')}>
      {type === AuthTypes.SIGN_IN ? (
        <p className="text-description auth-proposal-signin">
          You don’t have an account?
          <Link to={AppRoutes.AUTH_REGISTER.path} className="link-signup" onClick={handleNavigation}>
            Sign Up
          </Link>
        </p>
      ) : type === AuthTypes.SIGN_UP ? (
        <p className="text-description auth-proposal-signin">
          Already have an account?
          <Link to={AppRoutes.AUTH_LOG_IN.path} className="link-signin" onClick={handleNavigation}>
            Sign In
          </Link>
        </p>
      ) : type === AuthTypes.REFRESH_PASSWORD ? (
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

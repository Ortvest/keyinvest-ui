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

  const handleNavigation = (): void => {
    switch (type) {
      case AuthTypes.signin:
        navigate(AppRoutes.AUTH_LOG_IN.path);
        break;
      case AuthTypes.signup:
        navigate(AppRoutes.AUTH_REGISTER.path);
        break;
      case AuthTypes['refresh-password']:
        navigate(AppRoutes.AUTH_SEND_PASSWORD_RESET.path);
        break;
      default:
        break;
    }
  };

  return (
    <div className={classNames('auth-proposal', 'text-center')}>
      {type === AuthTypes.signin ? (
        <p className="text-description auth-proposal-signin">
          You don’t have an account?
          <Link to={AppRoutes.AUTH_REGISTER.path} className="link-signup" onClick={handleNavigation}>
            Sign Up
          </Link>
        </p>
      ) : type === AuthTypes.signup ? (
        <p className="text-description auth-proposal-signin">
          Already have an account?
          <Link to={AppRoutes.AUTH_LOG_IN.path} className="link-signin" onClick={handleNavigation}>
            Sign In
          </Link>
        </p>
      ) : type === AuthTypes['refresh-password'] ? (
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

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import './styles/styles.css';

interface AuthProposalProps {
  type: 'signin' | 'signup' | 'refresh-password' | 'send-reset' | 'email-sent';
  email?: string;
}

export const AuthProposal = ({ type, email }: AuthProposalProps) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (type === 'signin') {
      navigate(AppRoutes.AUTH_LOG_IN.path);
    } else if (type === 'signup') {
      navigate(AppRoutes.AUTH.path);
    } else if (type === 'refresh-password') {
      navigate(AppRoutes.AUTH_SEND_PASSWORD_RESET.path);
    }
  };

  return (
    <div className={classNames('auth-proposal', 'text-center')}>
      {type === 'signin' ? (
        <p className="text-description auth-proposal-signin">
          You don’t have an account?
          <a href="#" className="link-signup" onClick={handleNavigation}>
            Sign Up
          </a>
        </p>
      ) : type === 'signup' ? (
        <p className="text-description">
          Already have an account?
          <a href="#" className="link-signin" onClick={handleNavigation}>
            Sign In
          </a>
        </p>
      ) : type === 'refresh-password' ? (
        <p className="text-description text-flex">
          <span>Forgot password?</span>
          <a href="#" className="link-restore" onClick={handleNavigation}>
            Restore
          </a>
        </p>
      ) : type === 'send-reset' ? (
        <p className="text-reset-description">
          You will receive an email with a link to create <br />a new password by clicking on it.
        </p>
      ) : type === 'email-sent' ? (
        <div className="email-sent-text">
          <p>We have sent a link to this email:</p>
          <p className="email-text">{email}</p>
          <p>which you can follow to change your password.</p>
        </div>
      ) : null}
    </div>
  );
};

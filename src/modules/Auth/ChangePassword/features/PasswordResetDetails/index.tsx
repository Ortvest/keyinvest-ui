import { PasswordResetTypes } from '@modules/Auth/shared/types/passwordResetTypes';

import './styles/styles.css';

interface PasswordResetDetailsProps {
  type: (typeof PasswordResetTypes)[keyof typeof PasswordResetTypes];
  email?: string;
}

export const PasswordResetDetails = ({ type, email }: PasswordResetDetailsProps): JSX.Element => {
  console.log(email, 'email');
  return (
    <div className="password-reset-wrapper">
      {type === PasswordResetTypes.SEND_RESET && (
        <p className="text-reset-description">
          You will receive an email with a link to create <br />a new password by clicking on it.
        </p>
      )}

      {type === PasswordResetTypes.EMAIL_SENT && (
        <div className="email-sent-text">
          <p>We have sent a link to this email:</p>
          <p className="email-text">{email}</p>
          <p>which you can follow to change your password.</p>
        </div>
      )}
    </div>
  );
};

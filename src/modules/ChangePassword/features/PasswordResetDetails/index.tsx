import './styles/styles.css';

interface PasswordResetDetailsProps {
  type: 'send-reset' | 'email-sent';
  email?: string;
}

export const PasswordResetDetails = ({ type, email }: PasswordResetDetailsProps): JSX.Element => {
  return (
    <div className="password-reset-wrapper">
      {type === 'send-reset' && (
        <p className="text-reset-description">
          You will receive an email with a link to create <br />a new password by clicking on it.
        </p>
      )}

      {type === 'email-sent' && (
        <div className="email-sent-text">
          <p>We have sent a link to this email:</p>
          <p className="email-text">{email}</p>
          <p>which you can follow to change your password.</p>
        </div>
      )}
    </div>
  );
};

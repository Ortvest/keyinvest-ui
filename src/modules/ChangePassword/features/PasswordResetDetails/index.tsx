import './styles/styles.css';

interface PasswordResetDetailsProps {
  type: 'send-reset' | 'email-sent';
  email?: string;
}

export const PasswordResetDetails = ({ type, email }: PasswordResetDetailsProps) => {
  if (type === 'send-reset') {
    return (
      <p className="text-reset-description">
        You will receive an email with a link to create <br />a new password by clicking on it.
      </p>
    );
  }

  if (type === 'email-sent') {
    return (
      <div className="email-sent-text">
        <p>We have sent a link to this email:</p>
        <p className="email-text">{email}</p>
        <p>which you can follow to change your password.</p>
      </div>
    );
  }

  return null;
};

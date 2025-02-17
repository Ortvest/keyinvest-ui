import classNames from 'classnames';

import './styles/styles.css';

interface EmailButtonProps {
  onOpenEmailClick: () => void;
}

export const EmailButton = ({ onOpenEmailClick }: EmailButtonProps): JSX.Element => {
  return (
    <button className={classNames('email-button')} onClick={onOpenEmailClick}>
      Open Email
    </button>
  );
};

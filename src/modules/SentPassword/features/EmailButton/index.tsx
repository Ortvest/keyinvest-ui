import classNames from 'classnames';

import './styles/styles.css';

interface EmailButtonProps {
  onClick: () => void;
}

export const EmailButton = ({ onClick }: EmailButtonProps) => {
  return (
    <button className={classNames('email-button')} onClick={onClick}>
      Open Email
    </button>
  );
};

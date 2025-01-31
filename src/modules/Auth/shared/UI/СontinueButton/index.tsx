import classNames from 'classnames';

import './styles/styles.css';

interface ContinueButtonProps {
  onClick: () => void;
}

export const ContinueButton = ({ onClick }: ContinueButtonProps) => {
  return (
    <button className={classNames('continue-button')} onClick={onClick}>
      Continue
    </button>
  );
};

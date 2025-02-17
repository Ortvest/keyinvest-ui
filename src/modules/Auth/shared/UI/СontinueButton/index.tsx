import classNames from 'classnames';

import './styles/styles.css';

interface ContinueButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const ContinueButton = ({ onClick }: ContinueButtonProps): JSX.Element => {
  return (
    <button
      className={classNames('continue-button')}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}>
      Continue
    </button>
  );
};

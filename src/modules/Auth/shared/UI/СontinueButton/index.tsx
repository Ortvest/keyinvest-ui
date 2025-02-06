import classNames from 'classnames';

import './styles/styles.css';

interface ContinueButtonProps {
  onClick: () => void;
}

export const ContinueButton = ({ onClick }: ContinueButtonProps): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onClick();
  };

  return (
    <button className={classNames('continue-button')} onClick={handleClick}>
      Continue
    </button>
  );
};

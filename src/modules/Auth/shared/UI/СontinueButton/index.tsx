import classNames from 'classnames';

import './styles/styles.css';

interface ContinueButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const ContinueButton = ({ onClick }: ContinueButtonProps): JSX.Element => {
  const onHandleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <button className={classNames('continue-button')} onClick={onHandleClick}>
      Continue
    </button>
  );
};

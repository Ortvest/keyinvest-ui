import classNames from 'classnames';

import './styles/styles.css';

interface ContinueButtonProps {
  onHandleContinueClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const ContinueButton = ({ onHandleContinueClick }: ContinueButtonProps): JSX.Element => (
  <button className={classNames('continue-button')} onClick={onHandleContinueClick}>
    Continue
  </button>
);

import classNames from 'classnames';

import './styles/styles.css';

interface GoBackLinkProps {
  onClick: () => void;
}

export const GoBackLink = ({ onClick }: GoBackLinkProps): JSX.Element => {
  return (
    <button type="button" className={classNames('go-back-button')} onClick={onClick}>
      Go Back
    </button>
  );
};

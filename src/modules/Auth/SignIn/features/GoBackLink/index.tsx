import classNames from 'classnames';

import './styles/styles.css';

interface GoBackLinkProps {
  onClick: () => void;
}

export const GoBackLink = ({ onClick }: GoBackLinkProps) => {
  return (
    <button type="button" className={classNames('go-back-link')} onClick={onClick}>
      Go Back
    </button>
  );
};

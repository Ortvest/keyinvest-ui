import React from 'react';

import classNames from 'classnames';

import '../../styles/styles.css';

interface CreatePortfolioButtonProps {
  onClick: () => void;
}

export const CreatePortfolioButton = ({ onClick }: CreatePortfolioButtonProps): React.ReactNode => {
  return (
    <button className={classNames('brief-button')} onClick={onClick}>
      Create analytics
    </button>
  );
};

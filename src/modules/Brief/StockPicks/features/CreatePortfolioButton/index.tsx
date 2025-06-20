import React from 'react';

import classNames from 'classnames';

import '../../styles/styles.css';

interface CreatePortfolioButtonProps {
  onClick: () => void;
  loading?: boolean;
}

export const CreatePortfolioButton = ({ onClick, loading }: CreatePortfolioButtonProps): React.ReactNode => {
  return (
    <button className={classNames('brief-button')} onClick={onClick} disabled={loading}>
      {loading ? <div className="brief-spinner-button" /> : 'Create analytics'}
    </button>
  );
};

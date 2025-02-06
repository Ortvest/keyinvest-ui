import classNames from 'classnames';

import './styles/styles.css';

export const Privacy = (): JSX.Element => {
  return (
    <div className={classNames('privacy-wrapper')}>
      <a href="#" className={classNames('policy-link')}>
        Privacy policy
      </a>
      <a href="#" className={classNames('policy-link')}>
        Terms of use
      </a>
    </div>
  );
};

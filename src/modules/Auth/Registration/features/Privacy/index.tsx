import classNames from 'classnames';

import './styles/styles.css';

export const Privacy = (): JSX.Element => {
  return (
    <div className={classNames('privacy-wrapper')}>
      <a className={classNames('policy-link')}>Privacy policy</a>
      <a className={classNames('policy-link')}>Terms of use</a>
    </div>
  );
};

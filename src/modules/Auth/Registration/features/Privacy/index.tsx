import classNames from 'classnames';

import './styles/styles.css';

export const Privacy = (): JSX.Element => {
  return (
    <div className={classNames('privacy-wrapper')}>
      <a className={classNames('policy')}>Privacy policy</a>
      <a className={classNames('terms')}>Terms of use</a>
    </div>
  );
};

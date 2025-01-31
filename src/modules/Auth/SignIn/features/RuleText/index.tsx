import classNames from 'classnames';

import './styles/styles.css';

export const RuleText = () => {
  return (
    <div className={classNames('rule-text')}>
      <a href="#" className={classNames('link')}>
        Privacy policy
      </a>
      <a href="#" className={classNames('link')}>
        Terms of use
      </a>
    </div>
  );
};

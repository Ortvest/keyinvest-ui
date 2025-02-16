import classNames from 'classnames';

import './styles/styles.css';

export const RuleText = (): JSX.Element => {
  return (
    <div className={classNames('rule-text')}>
      <a href="#" className={classNames('rule-link')}>
        Privacy policy
      </a>
      <a href="#" className={classNames('rule-link')}>
        Terms of use
      </a>
    </div>
  );
};

import classNames from 'classnames';
import './styles/styles.css';

export const Privacy = () => {
  return (
    <div className={classNames('privacy-container')}>
      <a className={classNames('policy')}>Privacy policy</a>
      <div className={classNames('line')}></div>
      <a className={classNames('terms')}>Terms of use</a>
    </div>
  );
};

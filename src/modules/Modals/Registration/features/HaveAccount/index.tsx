import classNames from 'classnames';
import './styles/styles.css';

export const HaveAccount = () => {
  return (
    <div className={classNames('have-account-container')}>
      <div className={classNames('already-have')}>Already have an account?</div>
      <a className={classNames('sign-in')}>Sign In</a>
    </div>
  );
};

import classNames from 'classnames';

import './styles/styles.css';

export const SignInLink = (): JSX.Element => {
  return (
    <div className={classNames('sign-in-link-wrapper')}>
      <p className={classNames('sign-in-link-text')}>Already have an account?</p>
      <a className={classNames('sign-in-link-link')}>Sign In</a>
    </div>
  );
};

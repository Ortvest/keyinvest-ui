import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { signInWithGoogle } from '@modules/Auth/shared/UI/Firebase';

import IconGoogle from '@shared/assets/icons/Google_Icon.svg';

import './styles/styles.css';
import { useAuthenticateWithGoogleMutation } from '@global/api/auth/auth.api';

export const SocialAuth = (): JSX.Element => {
  const navigate = useNavigate();
  const [authenticateWithGoogle] = useAuthenticateWithGoogleMutation();

  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      const token = await signInWithGoogle();

      if (token) {
        await authenticateWithGoogle({ token }).unwrap();
        navigate(AppRoutes.MAIN.path);
        console.log('Token was  received');
      } else {
        console.error('Token was not received');
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <div className="social-auth-container">
      <div className="social-auth-divider">
        <span className="social-auth-divider-text">OR</span>
      </div>
      <button className="social-auth-button" onClick={handleGoogleSignIn}>
        <img src={IconGoogle} alt="Google Logo" />
        Continue with Google
      </button>
    </div>
  );
};

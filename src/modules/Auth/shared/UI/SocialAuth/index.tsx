import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { signInWithGoogle } from '@modules/Auth/shared/UI/Firebase.tsx/inde';

import IconGoogle from '@shared/assets/icons/Google_Icon.svg';

import './styles/styles.css';

export const SocialAuth = ({ setUser }: { setUser: (user: unknown) => void }): JSX.Element => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async (): Promise<void> => {
    const token = await signInWithGoogle();
    console.log('Token:', token);
    if (token) {
      try {
        const response = await fetch('https://keytrading-backend-production.up.railway.app/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        if (!response.ok) throw new Error(`Failed to authenticate: ${response.statusText}`);

        const userData = await response.json();
        console.log('User data from backend:', userData);

        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);

        navigate(AppRoutes.MAIN.path);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
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

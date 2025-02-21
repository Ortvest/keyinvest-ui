const API_URL = `${import.meta.env.VITE_API_URL}/auth/signIn`;

interface AuthenticateUserProps {
  user: {
    username: string;
    email: string;
    region: string;
  };
  data: unknown;
}

export const authenticateUser = async (email: string, password: string): Promise<AuthenticateUserProps> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return { user: data.user, data };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Something went wrong');
  }
};

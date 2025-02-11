import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from './AppLayout';
import { AuthLayout } from './AuthLayout';
import { AppRoutes } from './routes.constants';
import { SignInPage } from '@pages/Authorization';
import { ChangePasswordReset } from '@pages/ChangePasswordReset';
import { LandingPage } from '@pages/Landing';
import { SendPasswordReset } from '@pages/SendPasswordReset';
import { SentPasswordReset } from '@pages/SentPasswordReset';

export const router = (authed: boolean): ReturnType<typeof createBrowserRouter> =>
  createBrowserRouter([
    //not authed user
    {
      path: '/',
      element: <AuthLayout authed={authed} />,
      children: [
        {
          path: AppRoutes.AUTH_LOG_IN.path,
          element: <SignInPage />,
        },
        {
          path: AppRoutes.AUTH_SEND_PASSWORD_RESET.path,
          element: <SendPasswordReset />,
        },
        {
          path: AppRoutes.AUTH_SENT_PASSWORD_RESET.path,
          element: <SentPasswordReset />,
        },
        {
          path: AppRoutes.AUTH_PASSWORD_RESET.path,
          element: <ChangePasswordReset />,
        },
        {
          path: AppRoutes.ABOUT.path,
          element: null,
        },
        {
          path: AppRoutes.PRICING.path,
          element: null,
        },
        {
          path: AppRoutes.SUPPORT.path,
          element: null,
        },
        {
          path: AppRoutes.MAIN.path,
          element: <LandingPage />,
        },
      ],
    },
    //authed user
    {
      path: '/',
      element: <AppLayout authed={authed} />,
      children: [
        {
          path: AppRoutes.AUTHED_MAIN_PAGE.path,
          element: null,
        },
      ],
    },
    {
      path: '*',
      element: null,
    },
  ]);

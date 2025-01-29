import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from './AppLayout';
import { AuthLayout } from './AuthLayout';
import { AppRoutes } from './routes.constants';
import { LandingPage } from '@pages/Landing';

export const router = (authed: boolean): ReturnType<typeof createBrowserRouter> =>
  createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout authed={authed} />,
      children: [
        {
          path: AppRoutes.AUTH_LOG_IN.path,
          element: null,
        },
        {
          path: AppRoutes.AUTH_SEND_PASSWORD_RESET.path,
          element: null,
        },
        {
          path: AppRoutes.AUTH_SENT_PASSWORD_RESET.path,
          element: null,
        },
        {
          path: AppRoutes.AUTH_PASSWORD_RESET.path,
          element: null,
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
    {
      path: '/',
      element: <AppLayout authed={authed} />,
      children: [
        {
          path: AppRoutes.AUTHED_EXAMPLE_PAGE.path,
          element: null,
        },
      ],
    },
    {
      path: '*',
      element: null, // login page
    },
  ]);

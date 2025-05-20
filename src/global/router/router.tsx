import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@global/router/AppLayout';
import { AuthLayout } from '@global/router/AuthLayout';
import { AppRoutes } from '@global/router/routes.constants';
import { SystemLayout } from '@global/router/SystemLayout';

import { PackageDetails } from '@modules/Templates/PackageDetails';

import { AIAssistant } from '@pages/AIAssistant';
import { SignInPage } from '@pages/Authorization';
import { BriefPage } from '@pages/Brief';
import { ChangePasswordReset } from '@pages/ChangePasswordReset';
import { InvitePage } from '@pages/InvitePage';
import { LandingPage } from '@pages/Landing';
import { Notifications } from '@pages/Notifications';
import { PersonalInfo } from '@pages/PersonalInfo';
import { RegistrationPage } from '@pages/Registration';
import { SendPasswordReset } from '@pages/SendPasswordReset';
import { SentPasswordReset } from '@pages/SentPasswordReset';
import { TemplatesPage } from '@pages/Templates';

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
          path: AppRoutes.AUTH_REGISTER.path,
          element: <RegistrationPage />,
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
          path: AppRoutes.INVITATION_PAGE.path,
          element: <InvitePage />,
        },
        {
          path: AppRoutes.SYSTEM.path,
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
    //authed user
    {
      path: '/system',
      element: <SystemLayout authed={authed} />,
      children: [
        {
          index: true,
        },
        {
          path: AppRoutes.BRIEF.path,
          element: <BriefPage />,
        },
        {
          path: AppRoutes.TEMPLATES.path,
          element: <TemplatesPage />,
        },
        {
          path: `${AppRoutes.TEMPLATES.path}/:id`,
          element: <PackageDetails />,
        },
        {
          path: AppRoutes.NOTIFICATIONS.path,
          element: <Notifications />,
        },
        {
          path: AppRoutes.AI_ASSISTANT.path,
          element: <AIAssistant />,
        },
        {
          path: AppRoutes.PERSONAL_INFO.path,
          element: <PersonalInfo />,
        },
      ],
    },
    {
      path: '/',
      element: <AppLayout authed={authed} />,
      children: [
        {
          path: AppRoutes.AUTHED_MAIN_PAGE.path,
          element: null,
        },
        {
          path: AppRoutes.BRIEF.path,
          element: <BriefPage />,
        },
      ],
    },
    {
      path: '*',
      element: null,
    },
  ]);

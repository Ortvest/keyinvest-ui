import { setUser as setLoginUser } from '@global/store/slices/login.slice';
import { setUser as setRegisterUser } from '@global/store/slices/register.slice';

import { API_ENDPOINTS } from '../api.consts';
import { baseAuthApi } from './baseAuthApi';
import { HttpMethods } from '@shared/enums/HttpMethods.enums';
import { AuthCredentials, AuthResponse } from '@shared/interfaces/Auth.interfaces';

export const authApi = baseAuthApi.injectEndpoints({
  endpoints: (builder) => ({
    sendPasswordReset: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: API_ENDPOINTS.SEND_PASSWORD_RESET,
        method: HttpMethods.POST,
        body: { email },
      }),
    }),
    sendVerificationCode: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: API_ENDPOINTS.SEND_VERIFICATION_CODE,
        method: HttpMethods.POST,
        body: { email },
      }),
    }),
    verifyCode: builder.mutation<void, { email: string; code: string }>({
      query: ({ email, code }) => ({
        url: API_ENDPOINTS.VERIFY_CODE,
        method: HttpMethods.POST,
        body: { email, code },
      }),
    }),
    resetPassword: builder.mutation<void, { token: string; password: string }>({
      query: ({ token, password }) => ({
        url: API_ENDPOINTS.PASSWORD_RESET,
        method: HttpMethods.POST,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { password },
      }),
    }),
    authenticateUser: builder.mutation<AuthResponse, AuthCredentials>({
      query: ({ email, password }) => ({
        url: API_ENDPOINTS.AUTH_SIGN_IN,
        method: HttpMethods.POST,
        body: { email, password },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.user) {
            dispatch(setLoginUser(data.user));
          }
        } catch (error) {
          console.error('Authentication failed:', error);
        }
      },
    }),
    authenticateWithGoogle: builder.mutation<AuthResponse, { token: string }>({
      query: ({ token }) => ({
        url: API_ENDPOINTS.AUTH_GOOGLE,
        method: HttpMethods.POST,
        body: { idToken: token },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.user) {
            dispatch(setLoginUser(data.user));
          }
        } catch (error) {
          console.error('Google Authentication failed:', error);
        }
      },
    }),
    registerUser: builder.mutation<AuthResponse, { username: string; email: string; password: string }>({
      query: ({ username, email, password }) => ({
        url: API_ENDPOINTS.AUTH_SIGN_UP,
        method: HttpMethods.POST,
        body: { username, email, password },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.user) {
            dispatch(setRegisterUser(data.user));
          }
        } catch (error) {
          console.error('Registration failed:', error);
        }
      },
    }),
  }),
});

export const {
  useSendPasswordResetMutation,
  useAuthenticateUserMutation,
  useAuthenticateWithGoogleMutation,
  useSendVerificationCodeMutation,
  useRegisterUserMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} = authApi;

import { API_ENDPOINTS } from '@modules/Auth/shared/api/api.consts';
import { baseApi } from '@modules/Auth/shared/api/base.api';

import { HttpMethods } from '@shared/enums/HttpMethods.enums';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendPasswordReset: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: API_ENDPOINTS.SEND_PASSWORD_RESET,
        method: HttpMethods.POST,
        body: { email },
      }),
    }),
  }),
});

export const { useSendPasswordResetMutation } = authApi;

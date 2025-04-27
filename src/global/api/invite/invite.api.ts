import { API_ENDPOINTS } from '@global/api/api.consts';
import { inviteSendApi } from '@global/api/invite/inviteSendApi';
import { HttpMethods } from '@shared/enums/HttpMethods.enums';
import { InviteData } from '@shared/interfaces/Invite.interfaces';

export const inviteApi = inviteSendApi.injectEndpoints({
  endpoints: (builder) => ({
    sendInviteData: builder.mutation<void, InviteData>({
      query: (body) => ({
        url: API_ENDPOINTS.INVITE_SEND,
        method: HttpMethods.POST,
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log('Invite successfully sent.');
        } catch (error) {
          console.error('Failed to send invite:', error);
        }
      },
    }),
  }),
});

export const { useSendInviteDataMutation } = inviteApi;

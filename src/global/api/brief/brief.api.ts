import { baseBriefApi } from './baseBriefApi';
import { API_ENDPOINTS } from '../api.consts';
import { HttpMethods } from '@shared/enums/HttpMethods.enums';
import { CollectBriefDataInputs, StocksPicks } from '@shared/interfaces/Brief.interfaces';
import { setStockPicks } from '@global/store/slices/brief.slice';

export const briefApi = baseBriefApi.injectEndpoints({
  endpoints: (builder) => ({
    sendBriefData: builder.mutation<StocksPicks, CollectBriefDataInputs>({
      query: (body) => ({
        url: API_ENDPOINTS.COLLECT_BRIEF_DATA,
        method: HttpMethods.POST,
        body: { ...body, region: 'Poland' },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setStockPicks(data));
          }
        } catch (error) {
          console.error('Authentication failed:', error);
        }
      },
    }),
  }),
});

export const {
  useSendBriefDataMutation,
} = briefApi;
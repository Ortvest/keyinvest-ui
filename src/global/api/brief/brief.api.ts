import { setStockPicks } from '@global/store/slices/brief.slice';

import { API_ENDPOINTS } from '../api.consts';
import { baseBriefApi } from './baseBriefApi';
import { HttpMethods } from '@shared/enums/HttpMethods.enums';
import { CollectBriefDataInputs, InvestmentPackagePayload, StocksPicks } from '@shared/interfaces/Brief.interfaces';

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

    sendInvestmentPackage: builder.mutation<void, InvestmentPackagePayload>({
      query: (body) => ({
        url: API_ENDPOINTS.INVESTMENT_PACKAGE,
        method: HttpMethods.POST,
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log('Investment package successfully sent.');
        } catch (error) {
          console.error('Failed to send investment package:', error);
        }
      },
    }),
  }),
});

export const { useSendBriefDataMutation, useSendInvestmentPackageMutation } = briefApi;

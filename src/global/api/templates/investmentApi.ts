import { fetchPackagesFailure, fetchPackagesSuccess } from '@global/store/slices/templates.slice';

import { baseInvestmentApi } from './baseInvestmentApi';
import { API_ENDPOINTS } from '@global/api/api.consts';
import { HttpMethods } from '@shared/enums/HttpMethods.enums';

export interface InvestmentPackage {
  _id: string;
  packageName: string;
  stocks: Stock[];
  performance: number;
}

export interface Stock {
  logo: string;
  ticker: string;
  weburl: string;
  name: string;
  marketCapitalization: number;
  finnhubIndustry: string;
}

export const investmentApi = baseInvestmentApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvestmentPackages: builder.query<InvestmentPackage[], string>({
      query: (userId) => ({
        url: API_ENDPOINTS.PACKAGES,
        method: HttpMethods.GET,
        params: { userId },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(fetchPackagesSuccess(data));
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          dispatch(fetchPackagesFailure('Failed to fetch packages'));
        }
      },
    }),
  }),
});

export const { useGetInvestmentPackagesQuery } = investmentApi;

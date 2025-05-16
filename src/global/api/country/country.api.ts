import { baseCountryApi } from '@global/api/country/baseCountryApi';

interface Country {
  name: { common: string };
}

export const countryApi = baseCountryApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCountries: builder.query<Country[], void>({
      query: () => 'all',
      transformResponse: (response: Country[]) => {
        return response
          .filter((c) => c.name.common !== 'Russia' && c.name.common !== 'Belarus')
          .sort((a, b) => a.name.common.localeCompare(b.name.common));
      },
    }),
  }),
});

export const { useGetAllCountriesQuery } = countryApi;

import { baseCountryApi } from '@global/api/country/baseCountryApi';
import { Country } from '@shared/interfaces/Country.interfaces';

export const countryApi = baseCountryApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCountries: builder.query<Country[], void>({
      query: () => 'all?fields=name',
      transformResponse: (response: Country[]) => {
        return response
          .filter((c) => c.name.common !== 'Russia' && c.name.common !== 'Belarus')
          .sort((a, b) => a.name.common.localeCompare(b.name.common));
      },
    }),
    getPhoneCodes: builder.query<{ name: string; callingCode: string }[], void>({
      query: () => 'all?fields=name,idd',
      transformResponse: (response: Country[]) => {
        return response
          .filter(
            (c): c is Country & { idd: { root: string; suffixes: string[] } } =>
              Boolean(c.idd?.root && c.idd?.suffixes) && c.name.common !== 'Russia' && c.name.common !== 'Belarus'
          )
          .flatMap((c) =>
            c.idd.suffixes.map((suffix) => ({
              name: c.name.common,
              callingCode: `${c.idd.root}${suffix}`,
            }))
          )
          .sort((a, b) => a.name.localeCompare(b.name));
      },
    }),
  }),
});

export const { useGetAllCountriesQuery, useGetPhoneCodesQuery } = countryApi;

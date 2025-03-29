import * as yup from 'yup';

export const collectBriefDataSchema = yup.object().shape({
  period: yup.string(),
  goals: yup.array(),
  sectors: yup.array(),
  numCompanies: yup.string(),
});

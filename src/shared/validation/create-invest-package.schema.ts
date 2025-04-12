import * as yup from 'yup';

export const createInvestmentPackageSchema = yup.object().shape({
  packageName: yup
    .string()
    .required('Package name is required')
    .matches(/^[^A-Z]*$/, 'Package name must not contain capital letters'),
});

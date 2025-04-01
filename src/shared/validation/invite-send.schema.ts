import * as yup from 'yup';

export const inviteSendSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .min(2, 'Full Name must be at least 2 characters')
    .max(50, 'Full Name cannot exceed 50 characters')
    .required('Full Name is required'),

  email: yup.string().trim().email('Invalid email format').required('Email is required'),

  investmentExperience: yup
    .string()
    .oneOf(
      ['I`m just starting out', 'I have some experience', 'I`m a confident investor', 'I`m an investment expert'],
      'Invalid experience level'
    )
    .required('Investment Experience is required'),
});

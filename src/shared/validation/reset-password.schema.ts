import * as yup from 'yup';

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

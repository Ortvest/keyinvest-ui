import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  username: yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
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
  verificationCode: yup.string().length(6, 'Verification code must be 6 digits').required('Code is required'),
});

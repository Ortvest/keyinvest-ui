export const validatePassword = (password: string) => {
  return {
    isLengthValid: password.length >= 8,
    hasDigit: /\d/.test(password),
    hasSpecialChar: /[@!?%]/.test(password),
    isPasswordValid: password.length >= 8 && /\d/.test(password) && /[@!?%]/.test(password),
  };
};

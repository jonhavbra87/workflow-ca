// Email validator
export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@stud\.noroff\.no$/;
  return emailPattern.test(email);
};

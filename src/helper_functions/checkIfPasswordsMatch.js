export const checkIfPasswordsMatch = (
  passwordToCompare,
  confirmedPasswordToCompare
) => {
  const password = passwordToCompare;
  const confirmedPassword = confirmedPasswordToCompare;
  if (password !== confirmedPassword) {
    return false;
  }
  return true;
};

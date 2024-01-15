import { useEffect } from 'react';

export const useRegistrationValidation = (
  name: string,
  username: string,
  email: string,
  password: string,
  rePassword: string,
  usernameInvalid: boolean,
  emailInvalid: boolean,
  setRegisterButtonDisabled: (value: boolean) => void
) => {
  useEffect(() => {
    if (
      password !== rePassword ||
      password.length === 0 ||
      rePassword.length === 0 ||
      name.length === 0 ||
      username.length === 0 ||
      email.length === 0 ||
      usernameInvalid === true ||
      emailInvalid === true
    ) {
      setRegisterButtonDisabled(true);
    } else {
      setRegisterButtonDisabled(false);
    }
  }, [password, rePassword, email, username, name, usernameInvalid, emailInvalid]);
};
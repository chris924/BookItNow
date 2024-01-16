import { useEffect } from 'react';
import { GetCookie } from '../utils/cookies/SetCookie';


export const useUserRegistrationValidation = (
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

export const useCompanyRegistrationValidation = (
  companyName: string,
  email: string,
  password: string,
  description: string,
  rePassword: string,
  companyNameInvalid: boolean,
  emailInvalid: boolean,
  setRegisterButtonDisabled: (value: boolean) => void
) => {
  useEffect(() => {
    if (
      password !== rePassword ||
      password.length === 0 ||
      rePassword.length === 0 ||
      companyName.length === 0 ||
      email.length === 0 ||
      description.length === 0 ||
      companyNameInvalid === true ||
      emailInvalid === true
    ) {
      setRegisterButtonDisabled(true);
    } else {
      setRegisterButtonDisabled(false);
    }
  }, [password, rePassword, email, companyName, description, emailInvalid]);
};




export const useCheckCookie = (redirectCallback: () => void) => {
  useEffect(() => {
    const checkCookie = async () => {
      try {
        const cookie = await GetCookie("authToken");
        console.log(cookie);

        if (cookie && cookie.success === true) {
          console.log("FOUND COOKIE, REDIRECTING");
          redirectCallback();
        }
      } catch (error) {
        console.error("Error checking for cookie:", error);
      }
    };

    checkCookie();
  }, [redirectCallback]);
};
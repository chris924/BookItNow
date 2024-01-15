import Cookies from "universal-cookie";
import * as jwt from "jwt-decode";
import { DecodeJwtInterface, GetCookieInterface } from "../../lib/constants/interfaces/globalinterfaces";



const cookies = new Cookies();


export function SetCookie(name: string, value: string) {
  
  cookies.set(name, value);
}

export function GetCookie(name: string): Promise<GetCookieInterface> {
  return new Promise((resolve) => {
    const foundCookie = cookies.get(name);

    if (foundCookie) {
      resolve({success : true, jwt: foundCookie});
    }
    else{
      resolve({success: false, errorMessage: `Not found any cookie for ${name} `})
    } 
  }
)}

export function RemoveCookie(name: string) {
  console.log("REMOVING COOKIE", name);
  cookies.remove(name);
}

export function decodeJwt(name: string): Promise<DecodeJwtInterface> {
  return new Promise((resolve) => {

    const token = cookies.get(name); 

    if (token) {
      const decoded = jwt.jwtDecode(token);
      console.log(decoded);
      resolve({success: true, decoded: decoded})
    } else {
     resolve({success: false, errorMessage: "Could not decode JWT"})
    }
    
  })
}
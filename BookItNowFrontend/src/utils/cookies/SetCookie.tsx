

export default function SetCookie(name: string, value: string, days: number)
{
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";

}

export function GetCookie(name: string) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  }

  export function RemoveCookie(name: string)
  {

    const pastDate = new Date(0).toUTCString();
    const domain = window.location.hostname; 
    
    document.cookie = name + "=;expires=" + pastDate + ";path=/;domain=" + domain;
  
  }
import * as apiURL from "../../lib/constants/apiURL"
import { LoginResponse } from "../../lib/constants/interfaces/userInterface/UserInterfaces";




export default async function UserLoginFetch(email:string, password:string): Promise<LoginResponse>
{

    const LoginData = {
        email: email, 
        password: password,
    };


    try{
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.LOGIN_ENDPOINT}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginData)
        });
        
        if(response.ok)
        {
            
                const data: LoginResponse = await response.json();
                    const token = data.jwt;
                    console.log("Successfully logged in!");
                    return {success: true, jwt: token};
               
        }else {
        console.log("Bad Credentials");
        return {success: false, errorMessage: "Failed to fetch user login."};
        }

   }catch(err)
   {
    console.error(err);
    return {success: false, errorMessage: "An error occured while fetching user login"};
   }


}
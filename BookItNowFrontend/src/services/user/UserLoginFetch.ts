import * as apiURL from "../../lib/constants/apiURL"
import { UserLoginResponse } from "../../lib/constants/interfaces/UserInterfaces";




export default async function UserLoginFetch(email:string, password:string): Promise<UserLoginResponse>
{

    const LoginData = {
        email: email, 
        password: password,
    };


    try{
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.USER_LOGIN_ENDPOINT}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginData)
        });
        
        if(response.ok)
        {
            
                const data: UserLoginResponse = await response.json();
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
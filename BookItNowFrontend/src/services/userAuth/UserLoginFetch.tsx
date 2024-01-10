import * as apiURL from "../../lib/constants/apiURL"



export default async function UserLoginFetch(email:string, password:string): Promise<string | boolean>
{

    const LoginData = {
        email: email, 
        password: password,
    };

    interface LoginResponse {
        jwt:string;
    }



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
            return new Promise(async (resolve) => {
                const data: LoginResponse = await response.json();
                    const token = data.jwt;
                    console.log("Successfully logged in!");
                    resolve(token);
                });
        }else {
        console.log("Bad Credentials");
        return false;
        }

   }catch(err)
   {
    console.error(err);
    return false;
   }


}
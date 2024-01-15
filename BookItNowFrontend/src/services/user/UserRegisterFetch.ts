import * as apiURL from "../../lib/constants/apiURL"
import { UserRegisterResponse } from "../../lib/constants/interfaces/UserInterfaces";





export default async function UserRegisterFetch(name: string, username: string, email: string, password: string): Promise<UserRegisterResponse>
{
    const RegisterData = {
        name: name,
        username: username,
        email: email,
        password: password
    };


    try{
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.USER_REGISTER_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(RegisterData)
        });

        if(response.ok)
        {
            console.log("Successfully registered");


            const data: UserRegisterResponse = await response.json();
           
            return { success: true, name: data.name, username: data.username, email: data.email}
            
        }
        else{
            return {success: false, errorMessage: "Response is not OK during user registration"};
        }

    }catch(err)
    {
        return {success: false, errorMessage: "An error occured during user registration"};
    }

}
import * as apiURL from "../../lib/constants/apiURL"


export interface RegisterResponse {
    success: boolean,
    name?: string,
    username?: string,
    email?: string
    errorMessage?: string
}



export default async function UserRegisterFetch(name: string, username: string, email: string, password: string): Promise<RegisterResponse>
{
    const RegisterData = {
        name: name,
        username: username,
        email: email,
        password: password
    };


    try{
        const response = await fetch(`${apiURL.BASE_URL}${apiURL.REGISTER_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(RegisterData)
        });

        if(response.ok)
        {
            console.log("Successfully registered");


            const data: RegisterResponse = await response.json();
           
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
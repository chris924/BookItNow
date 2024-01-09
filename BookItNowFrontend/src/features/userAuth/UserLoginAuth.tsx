import UserLoginFetch from "../../services/userAuth/UserLoginFetch";



export default async function UserLoginAuth(email:string, password:string):Promise<string | boolean>
{
  const token = await UserLoginFetch(email, password);

  if (token !== false) {
    console.log("Successfully logged in!");
    return token;
  } else {
    console.log("Bad Credentials");
    return false;
  }
}
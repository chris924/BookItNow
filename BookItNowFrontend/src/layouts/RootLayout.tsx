
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import UseNavigation from "../hooks/UseNavigation";

export default function App() {

  const {navigateToUserLoginPage, navigateToUserRegisterPage, navigateToCompanyLoginPage, navigateToFAQPage} = UseNavigation();
 


  function handleLoginClick()
  {
    
    navigateToUserLoginPage();
  }

  function handleRegisterClick()
  {
    
    navigateToUserRegisterPage();
  }

  function handleCompaniesClick()
  {
    navigateToCompanyLoginPage()
  }



  return (
    <Navbar>
      <NavbarBrand>
      <a className="font-bold text-inherit">BookItNow</a>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" onClick={() => navigateToFAQPage()}>
            FAQ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" onClick={() => handleCompaniesClick()}>
            For Companies
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
      <NavbarItem>
          <Button as={Link} color="primary" variant="flat" onClick={() => handleLoginClick()}>
            Log in
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link}  color="primary" variant="flat" onClick={() => handleRegisterClick()}>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
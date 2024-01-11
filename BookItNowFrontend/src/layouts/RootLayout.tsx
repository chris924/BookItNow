
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import UseNavigation from "../hooks/UseNavigation";

export default function App() {
  
  const {navigateToLoginPage} = UseNavigation();
  const {navigateToRegisterPage} = UseNavigation();


  function handleLoginClick()
  {
    
    navigateToLoginPage();
  }

  function handleRegisterClick()
  {
    
    navigateToRegisterPage();
  }



  return (
    <Navbar>
      <NavbarBrand>
      <a className="font-bold text-inherit" href="/">BookItNow</a>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            FAQ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
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
          <Button as={Link} color="primary" variant="flat" onClick={() => handleRegisterClick()}>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
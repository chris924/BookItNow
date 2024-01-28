
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import UseNavigation from "../hooks/UseNavigation";

export default function App() {

  const {navigateToUserLoginPage, navigateToUserRegisterPage, navigateToCompanyLoginPage, navigateToFAQPage, navigateToFeaturesPage, navigateToHomePage} = UseNavigation();
 


  return (
    <Navbar>
      <NavbarBrand>
      <Link href="#" onClick={() => navigateToHomePage()} className="font-bold text-inherit">
                 BookItNow
            </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#" onClick={() => navigateToFeaturesPage()}>
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" onClick={() => navigateToFAQPage()}>
            FAQ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" onClick={() => navigateToCompanyLoginPage()}>
            For Companies
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
      <NavbarItem>
          <Button as={Link} color="primary" variant="flat" onClick={() => navigateToUserLoginPage()}>
            Log in
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link}  color="primary" variant="flat" onClick={() => navigateToUserRegisterPage()}>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
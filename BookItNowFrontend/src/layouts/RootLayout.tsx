import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function App() {
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
          <Button as={Link} color="primary" href="/user/login" variant="flat">
            Log in
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/user/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
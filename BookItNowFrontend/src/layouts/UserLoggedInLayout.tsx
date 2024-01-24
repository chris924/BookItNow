import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@nextui-org/react';

import { RemoveCookie } from '../utils/cookies/SetCookie';
import UseNavigation from '../hooks/UseNavigation';
import { UserLoggedInLayoutProps } from '../lib/constants/interfaces/UserInterfaces';


const UserLoggedInLayout: React.FC<UserLoggedInLayoutProps> = ({ UserData }) => {


  const {navigateToMainPage, navigateToMyUserAppointments} = UseNavigation();
  

    function handleLogout()
    {
      RemoveCookie("authToken");
      navigateToMainPage();
      
    }

    return (
      <>
        {UserData && typeof UserData !== 'boolean' && (
          <Navbar>
            <NavbarBrand>
              <p className="font-bold text-inherit">BookItNow</p>
            </NavbarBrand>
  
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
            </NavbarContent>
  
            <NavbarContent as="div" justify="end">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{UserData['name']}</p>
                  </DropdownItem>
                  <DropdownItem key="settings" onClick={() => navigateToMainPage()}>Search Companies</DropdownItem>
                  <DropdownItem key="appointments" onClick={() => navigateToMyUserAppointments()}>My Appointments</DropdownItem>
                  <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                  <DropdownItem key="logout" color="danger" onClick={() => handleLogout()}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          </Navbar>
        )}
      </>
    );
};

export default UserLoggedInLayout;
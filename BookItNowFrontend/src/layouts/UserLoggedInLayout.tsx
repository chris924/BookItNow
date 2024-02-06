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
import navbarIcon from "../styles/images/navbaricon.png";
import { BASE_URL } from '../lib/constants/apiURL';

const UserLoggedInLayout: React.FC<UserLoggedInLayoutProps> = ({ UserData }) => {


  const {navigateToMainPage, navigateToMyUserAppointments, navigateToUserSettings, navigateToUserSearchPage} = UseNavigation();
  

  

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
            <img src={navbarIcon} alt="Navbar Icon" className=" h-12" />
            <Link href="#" onClick={() => navigateToMainPage()} className="font-bold text-inherit">
                 BookItNow
            </Link>
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
                    name=""
                    size="md"
                    src={`${BASE_URL}/${UserData.avatarUrl}`}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat" className="cursor-pointer">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{UserData['name']}</p>
                  </DropdownItem>
                  <DropdownItem className="cursor-pointer" key="settings" onClick={() => navigateToUserSearchPage()} onTouchStart={() => navigateToUserSearchPage()}>Search Companies</DropdownItem>
                  <DropdownItem className="cursor-pointer" key="appointments" onClick={() => navigateToMyUserAppointments()} onTouchStart={() => navigateToMyUserAppointments()}>My Appointments</DropdownItem>
                  <DropdownItem className="cursor-pointer" key="settings" onClick={() => navigateToUserSettings()} onTouchStart={() => navigateToUserSettings()}>My Settings</DropdownItem>
                  <DropdownItem className="cursor-pointer" key="help_and_feedback">Help & Feedback</DropdownItem>
                  
                  <DropdownItem className="cursor-pointer" key="logout" color="danger" onClick={() => handleLogout()} onTouchStart={() => handleLogout()}>
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
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
import { CompanyLoggedInLayoutProps } from '../lib/constants/interfaces/CompanyInterfaces';
import navbarIcon from "../styles/images/navbaricon.png";
import { BASE_URL } from '../lib/constants/apiURL';

const CompanyLoggedInLayout: React.FC<CompanyLoggedInLayoutProps> = ({ CompanyData }) => {


  const {navigateToMainPage, navigateToCreateAppointment, navigateToCompanyMyBookedAppointmentsPage, navigateToCompanyAppointmentsHistoryPage, navigateToCompanySettings} = UseNavigation();



    async function handleLogout()
    {
     await RemoveCookie("authToken");
      navigateToMainPage();
      
    }  

    return (
      <>
      
        {CompanyData && typeof CompanyData !== 'boolean' && (
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
                    showFallback
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    
                    size="md"
                    src={`${BASE_URL}${CompanyData.avatarUrl}`}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{CompanyData['email']}</p>
                  </DropdownItem>
                  <DropdownItem className="cursor-pointer" key="listbookedappointments" onClick={() => navigateToCompanyMyBookedAppointmentsPage()} onTouchStart={() => navigateToCompanyMyBookedAppointmentsPage()}>My Booked Appointments </DropdownItem>
                  <DropdownItem className="cursor-pointer" key="listhistory" onClick={() => navigateToCompanyAppointmentsHistoryPage()} onTouchStart={() => navigateToCompanyAppointmentsHistoryPage()}>My Appointments History</DropdownItem>
                  <DropdownItem className="cursor-pointer" key="createappointments" onClick={() => navigateToCreateAppointment()} onTouchStart={() => navigateToCreateAppointment()}>Create Appointments</DropdownItem>
                  <DropdownItem className="cursor-pointer" key="help_and_feedback">Help & Feedback</DropdownItem>
                  <DropdownItem className="cursor-pointer" key="settings" onClick={() => navigateToCompanySettings()} onTouchStart={() => navigateToCompanySettings()}>My Settings</DropdownItem>
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

export default CompanyLoggedInLayout;
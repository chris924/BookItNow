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
                    src={`http://localhost:8080${CompanyData.avatarUrl}`}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{CompanyData['email']}</p>
                  </DropdownItem>
                  <DropdownItem key="listbookedappointments" onClick={() => navigateToCompanyMyBookedAppointmentsPage()}>My Booked Appointments </DropdownItem>
                  <DropdownItem key="listhistory" onClick={() => navigateToCompanyAppointmentsHistoryPage()}>My Appointments History</DropdownItem>
                  <DropdownItem key="createappointments" onClick={() => navigateToCreateAppointment()}>Create Appointments</DropdownItem>
                  <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                  <DropdownItem key="settings" onClick={() => navigateToCompanySettings()}>My Settings</DropdownItem>
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

export default CompanyLoggedInLayout;
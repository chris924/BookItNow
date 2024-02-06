import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import AppointmentAddUserFetch, { AppointmentUpdate } from "../../services/appointment/AppointmentAddUserFetch";
import { UserDataResult } from "../../lib/constants/interfaces/UserInterfaces";
import UseNavigation from "../../hooks/UseNavigation";
import { CompanyAppointmentData } from "../../lib/constants/interfaces/CompanyInterfaces";




export interface UserBookAppointmentProps {
  onClose: () => void;
  isOpen: boolean;
  companyAppointments: CompanyAppointmentData[];
  userData: UserDataResult;
}

export default function UserBookAppointment({ onClose, isOpen, companyAppointments, userData }: UserBookAppointmentProps) {

  const [value, setValue] = React.useState<string>("");

  const {navigateToMyUserAppointments} = UseNavigation();

  const [addUserFetchResponse, setAddUserFetchResponse] = useState<AppointmentUpdate>();



  const formatDateTime = (dateTimeString: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  const sortAppointments = (appointments: CompanyAppointmentData[]) => {
    
    const currentDate = new Date();

    const filtered = appointments.filter((x: CompanyAppointmentData) => x.userId === null && new Date(x.dateAndTime) >= currentDate).sort((a: CompanyAppointmentData, b: CompanyAppointmentData) => new Date(a.dateAndTime).getTime() - new Date(b.dateAndTime).getTime());
   
    return filtered;
  };


  const handleBookClick =  async () => {

    
    if(userData.data !== undefined)
    {
    const response =  await AppointmentAddUserFetch(Number(value), userData.data?.id)

    setAddUserFetchResponse(response);


    await new Promise(resolve => setTimeout(resolve, 1500));

    if(response.success === true)
    {
      navigateToMyUserAppointments();
    }
      
    }
  }

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };


  
  const sortedAppointments = sortAppointments(companyAppointments);

  console.log("COMPANY APPOINTMENTS IN BOOKAPPOINTMENT:", companyAppointments);

  return (
    <div className="z-50">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Book an appointment</ModalHeader>
            <ModalBody>
            {addUserFetchResponse && addUserFetchResponse.success !== undefined && (
              <Button className="animate__animated animate__bounceIn" color={addUserFetchResponse.success ? "success" : "danger"}>
                {addUserFetchResponse.success
                    ? "Successfully booked appointment!"
                    : "Could not book appointment!"}
               </Button>
               )}
              <Select
                label="Select a date"
                placeholder="Select a date"
                className="max-w-xs"
                selectedKeys={[value]}
                onChange={handleSelectionChange}
              >
                {sortedAppointments.map((date: CompanyAppointmentData): React.ReactElement => (
                  <SelectItem key={date.appointmentId} value={date.appointmentId}>
                    {formatDateTime(date.dateAndTime)}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose} onTouchStart={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={() => handleBookClick()} onTouchStart={() => handleBookClick()}>
                Book Appointment
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}
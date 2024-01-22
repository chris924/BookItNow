import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import AppointmentAddUserFetch from "../../services/appointment/AppointmentAddUserFetch";
import { UserDataResult } from "../../lib/constants/interfaces/UserInterfaces";
import UseNavigation from "../../hooks/UseNavigation";



interface CompanyAppointment {
  dateAndTime: string; // Change the type accordingly
  appointmentId: number;
  userId: number;
  // Add other properties if there are any
}

interface UserBookAppointmentProps {
  onClose: () => void;
  isOpen: boolean;
  companyAppointments: CompanyAppointment[];
  userData: UserDataResult;
}

export default function UserBookAppointment({ onClose, isOpen, companyAppointments, userData }: UserBookAppointmentProps) {

  const [value, setValue] = React.useState<string>("");

  const {navigateToMyUserAppointments} = UseNavigation();



  const formatDateTime = (dateTimeString: string): string => {
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

  const sortAppointments = (appointments: CompanyAppointment[]): CompanyAppointment[] => {
    return appointments.filter((x) => x.userId === null).sort((a, b) => new Date(a.dateAndTime).getTime() - new Date(b.dateAndTime).getTime());
  };


  const handleBookClick =  async () => {

    
    if(userData.data !== undefined)
    {
      await AppointmentAddUserFetch(Number(value), userData.data?.id)

      navigateToMyUserAppointments();
    }
    

  }

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };




  
  const sortedAppointments = sortAppointments(companyAppointments);

  return (
    <div className="z-50">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Book an appointment</ModalHeader>
            <ModalBody>
              <Select
                label="Select a date"
                placeholder="Select a date"
                className="max-w-xs"
                selectedKeys={[value]}
                onChange={handleSelectionChange}
              >
                {sortedAppointments.map((date: CompanyAppointment): any => (
                  <SelectItem key={date.appointmentId} value={date.appointmentId}>
                    {formatDateTime(date.dateAndTime)}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={() => handleBookClick()}>
                Book Appointment
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}
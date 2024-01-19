import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useState } from "react";


export default function CompanyCreateAppointmentForm() {

    const [selectedAppointments, setSelectedAppointments] = useState<{ timeIndex: number; dayIndex: number }[]>([]);

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    const handleButtonClick = (timeIndex: number, dayIndex: number) => {
      
        const isSelected = selectedAppointments.some(
          (appointment) => appointment.timeIndex === timeIndex && appointment.dayIndex === dayIndex
        );
    
       
        if (isSelected) {
          setSelectedAppointments((prevAppointments) =>
            prevAppointments.filter(
              (appointment) => !(appointment.timeIndex === timeIndex && appointment.dayIndex === dayIndex)
            )
          );
        } else {
          setSelectedAppointments((prevAppointments) => [
            ...prevAppointments,
            { timeIndex, dayIndex },
          ]);
        }
      };


      const handleSaveAppointments = () => {

        const selectedAppointmentsStartTimestamps = selectedAppointments.map(({ dayIndex, timeIndex }, index) => {
          
          console.log("DAYINDEX:", dayIndex);
          console.log("TIMEINDEX:", timeIndex);



          let today = new Date();

          if(today.getDay() === 5)
          {
            today.setDate(today.getDate() + 2);
          }

      
          let todayDay = today.getDay();
        
          
          let appointmentDay = (todayDay + dayIndex + 1) % 7; // Use modulo to ensure it stays in the range [0, 6]
      
          

          today.setDate(today.getDate() + (appointmentDay + 7 - todayDay) % 7);
      
         
         
          let timeStampTimeStart = today.setHours(timeIndex + 10 - 2, 0, 0, 0);
      
          console.log("Timestamp Start:", new Date(timeStampTimeStart));
          
          // Return the start timestamp if needed
          return new Date(timeStampTimeStart);
        });
      
        // Do something with selectedAppointmentsStartTimestamps if needed
        console.log(selectedAppointmentsStartTimestamps);
      };


    const calculateWeekdaysLeft = () => {
      
  
      const today = new Date();

      if(today.getDay() === 5)
          {
            today.setDate(today.getDate() + 2);
          }


      let currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

      
    

      const daysLeft = 5 - currentDay; // Assuming a standard workweek (Monday to Friday)
  
      const remainingWeekdays = weekdays.slice(currentDay + 1, currentDay + 1 + daysLeft);
  
      return { count: daysLeft > 0 ? daysLeft : 0, names: remainingWeekdays };
    };
  
   
    const generateTimeIntervals = () => {
      const startHour = 8;
      const endHour = 16;
      const timeIntervals = [];
  
      for (let hour = startHour; hour <= endHour; hour++) {
        timeIntervals.push(`${hour}:00 - ${hour + 1}:00`);
      }
  
      return timeIntervals;
    };
  
    
    return (
        <>
          <div className="">
            <Table aria-label="Example static collection table">
              <TableHeader>
                {calculateWeekdaysLeft().names.map((weekday, index) => (
                  <TableColumn key={index}>
                    <div className="text-center">{weekday}</div>
                  </TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {generateTimeIntervals().map((timeInterval, timeIndex) => (
                  <TableRow key={timeIndex}>
                    {calculateWeekdaysLeft().names.map((weekday, dayIndex) => (
                      <TableCell key={dayIndex}>
                        <div className="w-full">
                          <Button
                            className={`w-full ${
                              selectedAppointments.some(
                                (appointment) => appointment.timeIndex === timeIndex && appointment.dayIndex === dayIndex
                              )
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                            }`}
                            onClick={() => handleButtonClick(timeIndex, dayIndex)}
                          >
                            {`${timeInterval}`}
                          </Button>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
    
          <div className="flex justify-center mt-4">
            <Button onClick={() => handleSaveAppointments()}>Save My Appointments</Button>
          </div>
        </>
      );
    }
  
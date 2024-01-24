import { Accordion, AccordionItem } from "@nextui-org/react";



export default function FAQ()
{
    return(
        <div className="flex flex-wrap">
      <h1>Frequently Asked Questions</h1>

      {/* User FAQs */}
      <Accordion title="User" variant="shadow">
        {/* FAQ 1: How can I book appointments as a user? */}
        <AccordionItem key="1" aria-label="Accordion 1" title="How can I book appointments as a user?">
          <p>
            To book appointments as a user, log in to your account, navigate to the company's profile, and choose the available appointment slots. Click on the desired time slot and confirm your booking.
          </p>
        </AccordionItem>

        {/* FAQ 2: Where can I see my active appointments as a user? */}
        <AccordionItem key="2" aria-label="Accordion 2" title="Where can I see my active appointments as a user?">
          <p>
            You can view your active appointments on your dashboard. Once logged in, go to the "My Appointments" section to see the details of your upcoming appointments.
          </p>
        </AccordionItem>

        {/* FAQ 3: How do I check my appointment history as a user? */}
        <AccordionItem key="3" aria-label="Accordion 3" title="How do I check my appointment history as a user?">
          <p>
            To check your appointment history, visit the "My Appointments" tab on your dashboard. Here, you can find a list of all your past appointments along with their details.
          </p>
        </AccordionItem>
      </Accordion>

      {/* Company FAQs */}
      <Accordion title="Company" variant="shadow">
        {/* FAQ 4: How can I create appointment dates as a company? */}
        <AccordionItem key="4" aria-label="Accordion 4" title="How can I create appointment dates as a company?">
          <p>
            As a company, log in to your account and navigate to the "Create Appointments" section. Here, you can create new appointment dates by specifying the available time slots and other relevant details.
          </p>
        </AccordionItem>

        {/* FAQ 5: Where can I see who booked my appointments as a company? */}
        <AccordionItem key="5" aria-label="Accordion 5" title="Where can I see who booked my appointments as a company?">
          <p>
            To view the list of users who booked your appointments, go to the "My Booked Appointments" tab on your dashboard. Here, you will find a comprehensive list of all the booked appointments along with user details.
          </p>
        </AccordionItem>

        {/* FAQ 6: Can I modify or cancel appointments as a company? */}
        <AccordionItem key="6" aria-label="Accordion 6" title="Can I modify or cancel appointments as a company?">
          <p>
            Yes, as a company, you have the flexibility to modify or cancel appointments. Simply go to the "My Booked Appointments" section on your dashboard, locate the appointment you wish to modify or cancel, and follow the provided options.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
    )
}
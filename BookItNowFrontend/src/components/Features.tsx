import CardComponent from "./CardComponent";
import FeaturesCardComponent from "./FeaturesCardComponent";
import arrowDown from "../styles/images/arrowdown.png";
import StepByStepComponent from "./StepByStepComponent";


export default function Features() {


  const gradientStyle = {
    background: 'linear-gradient(90deg, #8E2DE2 0%, #800080 100%)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    
  };

  const containerStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    lineHeight: '1.5',
  };




  return (
    <div className="container mx-auto my-8">
      <h1 className="flex justify-center text-4xl font-bold mb-8 ">Key Features</h1>

      <div style={containerStyle}>
      <h2 className="flex justify-center text-2xl font-semibold mb-4" style={gradientStyle}>User Features</h2>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-10 py-10">
        <FeaturesCardComponent
          cardTitle="Easy Booking"
          cardBody="Streamline the appointment booking process as a user. Browse through available slots, choose a suitable time, and confirm your booking effortlessly."
          src=""
        />
        <FeaturesCardComponent
          cardTitle="Intuitive Dashboard"
          cardBody="Access a user-friendly dashboard that provides a comprehensive overview of your active appointments and history. Manage your schedule with ease."
          src=""
        />
      </div>

      <div style={containerStyle}>
      <h2 className="flex justify-center text-2xl font-semibold mb-4" style={gradientStyle}>Company Features</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10">
        <FeaturesCardComponent
          cardTitle="Effortless Appointment Management"
          cardBody="Create, modify, or cancel appointment dates with ease. Specify available time slots and other relevant details effortlessly."
          src=""
        />
        <FeaturesCardComponent
          cardTitle="Booking Insights"
          cardBody="Gain insights into who booked your appointments. Access a comprehensive list of booked appointments along with user details."
          src=""
        />
        <FeaturesCardComponent
          cardTitle="Flexibility to Modify or Cancel"
          cardBody="Modify or cancel appointments as needed. Access the Booked Appointments section on your dashboard for quick adjustments."
          src=""
        />
      </div>


      <div style={containerStyle}>
      <h2 className="flex justify-center text-3xl font-semibold mb-4 py-10" style={gradientStyle}>How do I start?</h2>
      </div>
 
      <div className="flex flex-col justify-center ">
      <StepByStepComponent title="Create a Company Account" text="Visit the For Companies page and create a company account."/>
      <StepByStepComponent title="Create Appointment Slots" text="Click on your default avatar, and create free appointment slots. Choose some available slots."/>
      <StepByStepComponent title="Log Out" text="Once you have set up your company with available appointment slots, log out."/>
      <StepByStepComponent title="Create a User Profile" text="Click on the register on the right side to create a user profile."/>
      <StepByStepComponent title="Book an Appointment" text="Click on the three buttons on the right side of your created company and choose Book."/>
      <StepByStepComponent title="View Active Appointment" text="After booking an available slot that you created as a company, you can see your active appointment in the My Appointments section."/>
      <StepByStepComponent title="View User Profile" text="You can also see the specific user profile that booked an appointment on the company side."/>
    </div>

    </div>

    


  );
      
}
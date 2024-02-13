import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/system'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import UserLoginPage from './pages/UserLoginPage';
import UserRegisterPage from './pages/UserRegisterPage';
import UserSearchPage from './pages/UserSearchPage';
import HomePage from './pages/HomePage';
import CompanyLoginPage from './pages/CompanyLoginPage';
import CompanyLoggedInPage from './pages/CompanyLoggedInPage';
import CompanyRegisterPage from './pages/CompanyRegisterPage';
import CompanyCreateAppointmentPage from './pages/CompanyCreateAppointmentPage';
import UserMyAppointmentsPage from './pages/UserMyAppointmentsPage';
import CompanyMyBookedAppointmentsPage from './pages/CompanyMyBookedAppointmentsPage';
import CompanyAppointmentHistoryPage from './pages/CompanyAppointmentHistoryPage';
import FAQPage from './pages/FAQPage';
import FeaturesPage from './pages/FeaturesPage';
import UserSettingsPage from './pages/UserSettingsPage';
import CompanySettingsPage from './pages/CompanySettingsPage';
import UserLoggedInPage from './pages/UserLoggedInPage';




export default function App() {
  //const navigate = useNavigate();
 // const darkMode = useDarkMode(true);

 return (
  <NextUIProvider>
  <main className="purple-dark bg-gradient-to-r from-gray-700 via-gray-900 to-black" style={{ backgroundColor: 'linear-gradient(to right, #4a5568, #1a202c, #000000)' }}>
  <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/faq" element={<FAQPage />} />
  <Route path="features" element={<FeaturesPage/>}/>
  <Route path="user">
    <Route path="login" element={<UserLoginPage />} />
    <Route path="register" element={<UserRegisterPage />} />
    <Route path="home" element={<UserLoggedInPage />} />
    <Route path="search" element={<UserSearchPage/>}/>
    <Route path="my-appointments" element={<UserMyAppointmentsPage />} />
    <Route path="settings" element={<UserSettingsPage/>}/>
    
  </Route>
  <Route path="company">
    <Route path="login" element={<CompanyLoginPage />} />
    <Route path="register" element={<CompanyRegisterPage />} />
    <Route path="home" element={<CompanyLoggedInPage/>}></Route>
    <Route path="create-appointment" element={<CompanyCreateAppointmentPage />} />
    <Route path="my-booked-appointments" element={<CompanyMyBookedAppointmentsPage />}></Route>
    <Route path="appointment-history" element={<CompanyAppointmentHistoryPage/>}></Route>
    <Route path="settings" element={<CompanySettingsPage/>}></Route>
  </Route>
</Routes>
  </main>
</NextUIProvider>
);

  }



  interface CustomWindow extends Window {
    global?: any; // Make 'global' property optional to match 'Window & typeof globalThis'
  }
  
  // Cast window to the extended interface
  const customWindow: CustomWindow = window;
  
  // Set the global property
  customWindow.global = globalThis;
  
  
  const rootElement = document.getElementById('root');
  if (rootElement) {
    
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
       
       <NextUIProvider>
   
       <BrowserRouter>
       
           <App/>
           
        </BrowserRouter>
     
       </NextUIProvider>
       
       
      </React.StrictMode>
    );
  } else {
    console.error("Root element not found");
    }




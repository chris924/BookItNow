import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/system'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import UserLoginPage from './pages/UserLoginPage';
import UserRegisterPage from './pages/UserRegisterPage';
import UserLoggedInPage from './pages/UserLoggedInPage';
import HomePage from './pages/HomePage';
import CompanyLoginPage from './pages/CompanyLoginPage';
import CompanyLoggedInPage from './pages/CompanyLoggedInPage';
import CompanyRegisterPage from './pages/CompanyRegisterPage';




export default function App() {
  //const navigate = useNavigate();
 // const darkMode = useDarkMode(true);

 return (
  <NextUIProvider>
  <main className="purple-dark bg-gradient-to-r from-gray-700 via-gray-900 to-black">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="user">
        <Route path="login" element={<UserLoginPage />} />
        <Route path="register" element={<UserRegisterPage />} />
        <Route path="home" element={<UserLoggedInPage />} />
      </Route>
      <Route path="company">
        <Route path="login" element={<CompanyLoginPage />} />
        <Route path="register" element={<CompanyRegisterPage/>} />
        <Route path="home" element={<CompanyLoggedInPage/>}></Route>
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




import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/system'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import UserLoginPage from './pages/UserLoginPage';
import UserRegisterPage from './pages/UserRegisterPage';
import UserLoggedInPage from './pages/UserLoggedInPage';
import HomePage from './pages/HomePage';
import RootLayout from './layouts/RootLayout';
import UserLoggedInLayout from './layouts/UserLoggedInLayout';



export default function App() {
  const navigate = useNavigate();
 // const darkMode = useDarkMode(true);

 return (
  <NextUIProvider>
    <main className="purple-dark bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Render HomePage as a child route of RootLayout */}
          <Route index element={<HomePage />} />
        </Route>
        <Route path="user">
          {/* Render UserLoginPage, UserRegisterPage, and UserLoggedInLayout as children of the /user route */}
          <Route path="login" element={<UserLoginPage />} />
          <Route path="register" element={<UserRegisterPage />} />
          <Route path="home" element={<UserLoggedInLayout />}>
            {/* Render UserLoggedInPage as a child route of UserLoggedInLayout */}
            <Route index element={<UserLoggedInPage />} />
          </Route>
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




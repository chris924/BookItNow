import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/system'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import UserLoginPage from './pages/UserLoginPage';
import HomePage from './pages/HomePage';
import RootLayout from './layouts/RootLayout';
import useDarkMode from 'use-dark-mode';



export default function App() {
  const navigate = useNavigate();
  const darkMode = useDarkMode(true);

  return (
    <NextUIProvider navigate={navigate}>
       <main className="purple-dark text-foreground bg-background bg-gradient-to-r from-gray-700 via-gray-900 to-black">
       <RootLayout/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="user/login" element={<UserLoginPage/>} />
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
       <main className="purple-dark text-foreground bg-background bg-gradient-to-r from-gray-700 via-gray-900 to-black">
       <BrowserRouter>
       
           <App/>
           
        </BrowserRouter>
       </main>
       </NextUIProvider>
       
       
      </React.StrictMode>
    );
  } else {
    console.error("Root element not found");
    }




import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {

      }
    ]
  }
]);


const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <NextUIProvider>
        <RouterProvider router={router}/>
      </NextUIProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}



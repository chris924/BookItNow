import { CircularProgress } from "@nextui-org/react";
import React from "react";


export default function LoadingCircle()
{
    

      return(
        <div className="flex justify-center items-center h-screen">
        <CircularProgress
      label="Loading..."
      color="primary"
    />
        </div>

      )
      
}
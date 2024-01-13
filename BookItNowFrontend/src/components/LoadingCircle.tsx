import { CircularProgress } from "@nextui-org/react";


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
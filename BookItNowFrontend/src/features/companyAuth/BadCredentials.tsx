import { Button, Tooltip } from "@nextui-org/react";



export default function BadCredentials()
{
    return(
      <Tooltip content="Try Again" color="secondary">
      <Button color="danger">Wrong Credentials</Button>
    </Tooltip>
    )
}
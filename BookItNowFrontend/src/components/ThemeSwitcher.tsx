import React from "react";
import useDarkMode from "use-dark-mode";
import { Button } from "@nextui-org/button";

export default function ThemeSwitcher()
{
  const darkMode = useDarkMode(false);
  
  return (
    <div>
        <Button color="primary" onClick={darkMode.disable}>Light Mode</Button>
        <Button color="primary" onClick={darkMode.enable}>Dark Mode</Button>
      

    </div>
  )
};
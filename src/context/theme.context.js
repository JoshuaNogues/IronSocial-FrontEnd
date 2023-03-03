// src/context/theme.context.js
import { useState } from "react";

import { createContext } from "react";


const ThemeContext = createContext();

// CREATE A WRAPPER COMPONENT
function ThemeProviderWrapper({ children }) {

    const [ toggle, setToggle ] = useState(true)
    const [ mode, setMode ] = useState('☀')

  return (

    <ThemeContext.Provider value={{  mode, toggle, setToggle, setMode }}>
        {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProviderWrapper };   // <== UPDATE
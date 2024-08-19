import { createContext, useState } from "react";

export const ThemeContext = createContext()

const themes = {
    dark:{
        bgcolor:'black'
    },
    light:{
        bgcolor:'white'
    }
}

export const Themeprovider = ({children}) =>{

    const [isdark,setisdark] = useState(false)

    const toggletheme = ()=>{

        setisdark(!isdark)

    }

    return (
        <ThemeContext.Provider value={[{isdark,setisdark},{toggletheme,themes}]}>{children}</ThemeContext.Provider>
    )
}
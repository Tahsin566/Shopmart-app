import { createContext, useState } from "react";


export const Authcontext = createContext()

export const Authprovider = ({children}) =>{
    const [auth, setauth] = useState(false)

    const toggleauth = () =>{
        setauth(!auth)
        console.log("auth",auth);
    }

    return (
        <Authcontext.Provider value={[{auth,setauth},toggleauth]}>{children}</Authcontext.Provider>
    )
}
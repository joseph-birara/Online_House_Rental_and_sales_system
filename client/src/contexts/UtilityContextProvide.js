import { createContext, useState } from "react";

export const UtilityContext = createContext()

export function UtilityContextProvider ({children}){

    const [HousesList, setHousesList ] = useState([])
    const [OwnersList, setOwnersList ] = useState([])
    const [BuyersList, setBuyerList] = useState()
    const [applications, setApplications] = useState([])





    return(
        <UtilityContext.Provider value ={{HousesList, setHousesList, applications, setApplications}} >

            {children}
        </UtilityContext.Provider>
    )
}

export default UtilityContextProvider
import { createContext, useState } from "react";

export const UtilityContext = createContext()

export function UtilityContextProvider ({children}){

    const [HousesList, setHousesList ] = useState([])
    const [OwnersList, setOwnersList ] = useState([])
    const [BuyersList, setBuyerList] = useState()




    return(
        <UtilityContext.Provider value ={{HousesList, setHousesList}} >

            {children}
        </UtilityContext.Provider>
    )
}

export default UtilityContextProvider
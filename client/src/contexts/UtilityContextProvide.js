import { createContext, useState } from "react";

export const UtilityContext = createContext()

export function UtilityContextProvider({ children }) {

    const [HousesList, setHousesList] = useState([])
    const [OwnersList, setOwnersList] = useState([])
    const [TenantList, setTenatList] = useState([])
    const [BuyersList, setBuyerList] = useState()
    const [applications, setApplications] = useState([])
    const [AdminsList, setAdminList] = useState([])
    // const [both_Tenant_and_Buyer, set_both_Tenant_and_Buyer] = useState([])

    return (
        <UtilityContext.Provider value={{
            HousesList,
            setHousesList,
            applications,
            AdminsList,
            setAdminList,
            setApplications,
            OwnersList,
            setOwnersList, TenantList, setTenatList, BuyersList, setBuyerList
        }} >

            {children}
        </UtilityContext.Provider>
    )
}

export default UtilityContextProvider
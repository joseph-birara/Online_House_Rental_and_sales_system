import axios from "axios";
import React, { useContext, useEffect } from "react";
import { UtilityContext } from "../../contexts/UtilityContextProvide";
import { UserContext } from "../../contexts/UserContextProvider";

const PaymentSuccessMessage = () => {
  const { user } = useContext(UserContext);
  const { setApplications } = useContext(UtilityContext);

  useEffect(() => {

    // set applications list 
    axios.get(`${process.env.REACT_APP_baseURL}/application/bytenant/${user._id}`)
      .then((response) => {
        setApplications(response.data);
        // console.log("ap", applications);
      }).catch((error) => {
        console.log(error);
      });
  })
  return (
    <div className="text-[green] font-extrabold text-center m-10 p-10 pt-15 font-body text-5xl">
      Payment Successfully Paid !!!
    </div>
  );
};

export default PaymentSuccessMessage;

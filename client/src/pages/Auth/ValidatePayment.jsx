import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextProvider';
import { UtilityContext } from '../../contexts/UtilityContextProvide';

const ValidatePayment = () => {
    const { appli_id } = useParams()
    const { user } = useContext(UserContext)
    const { setApplications } = useContext(UtilityContext);

    useEffect(() => {
        if (appli_id) {

            axios.post(`http://localhost:4000/payment/verify/${appli_id}`)
                .then((response) => {
                    console.log(' admin is on the tenant list pages ');
                    // setOwnersList(response.data);

                    axios.get(`http://localhost:4000/application/bytenant/${user._id}`)
                        .then((response) => {
                            // set all states
                            setApplications(response.data)
                        }).catch()
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [appli_id]);


    return <div></div>;
};

export default ValidatePayment;

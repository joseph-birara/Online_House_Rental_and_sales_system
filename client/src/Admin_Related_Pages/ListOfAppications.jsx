import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormatDate } from "../services/HelperFunction"


const ListOfApplications = () => {

    const [applications, setAplications] = useState([])
    useEffect(() => {
        // get all houses and set to the context
        axios.get('http://localhost:4000/application/visit')
            .then((response) => {
                setAplications(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <div>
            {!applications && <div> No applications is added on the site</div>}
            {applications && applications.map((app) => (
                <div key={app._id} className="outline outline-[lightgray] outline-[3px] p-2 w-11/12 mx-auto  rounded flex items-center mb-3">

                    {/* owner */}
                    <div className='w-1/4'>
                        <p className='m-1 text-xl font-medium'>Owner</p>
                        <p>Name: <span className="ml-1 text-base font-semibold">{app.ownerId.name} {app.ownerId.lastName} </span></p>
                        <p>Email: <span className="ml-1 text-base font-semibold">{app.ownerId.email}</span></p>
                        <p>Phone: <span className="ml-1 text-base font-semibold">{app.ownerId.phone}</span></p>
                    </div>

                    {/* Aplicant */}
                    <div className='w-1/4'>
                        <p className='m-1 text-xl font-medium'>Applicant</p>
                        <p>Name: <span className="ml-1 text-base font-semibold">{app.applicantId.name} {app.applicantId.lastName} </span></p>
                        <p>Email: <span className="ml-1 text-base font-semibold">{app.applicantId.email}</span></p>
                        <p>Phone: <span className="ml-1 text-base font-semibold">{app.applicantId.phone}</span></p>
                    </div>

                    {/* application Info */}
                    <div className='w-1/4'>
                        <p className='m-1 text-xl font-medium'>Application detail </p>
                        <p>Visit Request : <span className="ml-1 text-base font-semibold">{app.visitRequest ? FormatDate(app.visitRequest) : "Not Specified"}</span></p>
                        <p>Check in: <span className="ml-1 text-base font-semibold">{app.checkin ? FormatDate(app.checkin) : "Not Specified"}</span></p>
                        <p>Check out: <span className="ml-1 text-base font-semibold">{app.checkout ? FormatDate(app.checkout) : "Not Specifed"}</span></p>
                    </div>
                    {/* Home detail Info */}
                    <div className='w-1/4'>
                        <p className='m-1 text-xl font-medium'>Home detail </p>
                        <p>Appli Type : <span className="ml-1 text-base font-semibold">{app.applicationType}</span></p>
                        <p>SubCity: <span className="ml-1 text-base font-semibold">{app.homeId.subCity}</span></p>
                        <p>Woreda: <span className="ml-1 text-base font-semibold">{app.homeId.woreda}</span></p>
                    </div>

                </div>
            ))}
        </div>

    );
};

export default ListOfApplications;

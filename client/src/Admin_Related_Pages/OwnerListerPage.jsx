import React, { useContext, useEffect, useId, useState } from 'react';
import { UserContext } from '../contexts/UserContextProvider';
import { UtilityContext } from '../contexts/UtilityContextProvide';
import axios from 'axios';

const OwnerListerPage = () => {

    const { token } = useContext(UserContext)
    const { OwnersList, setOwnersList } = useContext(UtilityContext)
    const altenativeImageLink = "https://res.cloudinary.com/dmegiw31y/image/upload/v1687634119/HomeRental/alt-image_rn3zbk.webp"
    const [selectedOption, setSelectionOption] = useState('')
    useEffect(() => {
        // get all houses and set to the context
        axios.get('http://localhost:4000/owner/all')
            .then((response) => {
                console.log(' admin is on the tenant list pages ');
                setOwnersList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleActionChange = (USERID, action, status, isSuspended) => {

        setSelectionOption('')
        if (action === 'delete') {
            axios.delete(`${process.env.REACT_APP_baseURL}/owner/delete/${USERID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((response) => {
                // update the context
                const fileredOwners = OwnersList.filter((owner) => owner._id !== USERID);
                setOwnersList(fileredOwners);
                console.log("Owner with " + useId + " is deleted");
                // return <Navigate to={"/homeOwner/homes/onListing"} />;
            }).catch((error) => {
                console.log("Error on deleting owner");
                console.log(error.message);
            });
        }
        else if (action === 'activate' || action === 'suspend') {
            console.log('pressed activate button');
            const ownerData = { id: USERID }

            if (action === 'activate') {
                ownerData.accountStatus = !status;
            } else {
                ownerData.suspended = !isSuspended;
            }

            axios.put(`http://localhost:4000/owner/update`, ownerData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((response) => {

                // update the context
                console.log("updated successfully");
                console.log(response.data);
                if (action === 'activate') {
                    setOwnersList(prev => {
                        return prev.map(user => {
                            if (user._id === USERID) {
                                return { ...user, accountStatus: ownerData.accountStatus }
                            }
                            return user;
                        })
                    });
                } else {

                    setOwnersList(prev => {
                        return prev.map(user => {
                            if (user._id === USERID) {
                                return { ...user, suspended: ownerData.suspended }
                            }
                            return user;
                        })

                    });
                }

                console.log(OwnersList);
                // return <Navigate to={"/homeOwner/homes/onListing"} />;
            }).catch((error) => {
                console.log("Error on updating owner");
                console.log(error.message);
            });
        }
    }

    return (
        <div>
            {!OwnersList && <div> No buyer is added on the site</div>}
            {OwnersList && OwnersList.map((user) => (
                <div key={user.id} className="border border-[#cccaca] 11/12 mx-auto rounded flex flex-row items-center mb-3">
                    <div className="rounded bg-gray-300 mx-3">
                        <img
                            src={user.image || altenativeImageLink}
                            alt=""
                            className="w-28 h-28 rounded object-cover"
                        />
                    </div>

                    <div className="ml-2 flex justify-start gap-x-3">
                        <div>
                            <p>First Name: <span className="ml-1 text-base font-semibold">{user.name}</span></p>
                            <p>Last Name: <span className="ml-1 text-base font-semibold">{user.lastName}</span></p>
                        </div>

                        <div >
                            <p>Email: <span className="ml-1 text-base font-semibold">{user.email}</span></p>
                            <p className="flex">
                                Acc. Status:
                                <div className="ml-3 flex justify-center items-center">
                                    <svg
                                        className={`w-4 h-4 mr-1.5 ${user.accountStatus ? 'text-[#38A169]' : 'text-[#DC2626]'} dark:text-green-400 flex-shrink-0`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <p>{user.accountStatus ? 'active' : 'inactive'}</p>
                                </div>
                            </p>
                        </div>

                        <div className="">
                            <p>City:<span className="ml-1 text-base font-semibold">{user.city}</span></p>
                            <p>Subcity: <span className="ml-1 text-base font-semibold">{user.subcity}</span></p>
                        </div>

                        <div >
                            <p className={`flex w-fit  px-1 outline outline-[2px] ${user.suspended ? 'outline-[#de1414] text-[#de1414]' : 'outline-[008000] text-[#008000]'} justify-center rounded-lg`}>
                                {user.suspended ? 'Suspended' : 'Not-suspended'}
                            </p>
                            <p>Phone: <span className="ml-1 text-base font-semibold">{user.phone}</span></p>
                        </div>
                    </div>

                    <select
                        value={selectedOption}
                        className="outline ml-auto mr-10 bg-lightBlue hover:bg-lbHover text-white py-2 px-2 rounded"
                        onChange={(e) => {
                            handleActionChange(user._id, e.target.value, user.accountStatus, user.suspended);
                        }}
                    >
                        <option value="">Select Action</option>
                        <option value="delete">Delete</option>
                        <option value="activate">{user.accountStatus ? 'Deactivate' : 'Activate'}</option>
                        <option value="suspend">{user.accountStatus ? 'Unsuspend' : 'Suspend'}</option>
                    </select>
                </div>
            ))}
        </div>

    );
};

export default OwnerListerPage;

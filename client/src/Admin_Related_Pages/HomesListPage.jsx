// import { Link, Navigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { UserContext } from "../contexts/UserContextProvider";
import axios from "axios";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import { useEffect } from "react";

const HomeLister = ({ objectList }) => {

    const { token } = useContext(UserContext);
    const { setHousesList } = useContext(UtilityContext);
    const [selectedOption, setSelectionOption] = useState('')

    const handleSelect = (action, houseId, homeStatus) => {

        // clear selected opton
        setSelectionOption('')
        if (action === 'verify') {
            // update home and state
            const houseUpdatedData = { id: houseId, verified: !homeStatus.verified }
            axios.put(`${process.env.REACT_APP_baseURL}/houses/update`, houseUpdatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {

                // update the context
                setHousesList(prev => {
                    return prev.map(house => {
                        if (house._id === houseId) {
                            return { ...house, verified: houseUpdatedData.verified };
                        }
                        return house;
                    })
                });
                console.log('Verified - House updated successfully');
                // return <Navigate to={"/homeOwner/homes/onListing"} />;
            }).catch((error) => {
                console.log("Verified - Error on updating House");
                console.log(error.message);
            });


        } else if (action === 'suspend') {

            const houseUpdatedData = { id: houseId, suspended: !homeStatus.suspended }
            axios.put(`${process.env.REACT_APP_baseURL}/houses/update`, houseUpdatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {

                // update the context
                setHousesList(prev => {
                    return prev.map(house => {
                        if (house._id === houseId) {
                            return { ...house, suspended: houseUpdatedData.suspended };
                        }
                        return house;
                    })
                });
                console.log('Suspended - House updated successfully');
                // return <Navigate to={"/homeOwner/homes/onListing"} />;
            }).catch((error) => {
                console.log("Suspended - Error on updating House");
                console.log(error.message);
            });

        }

    }

    return <>
        <div>
            {objectList.map((house) => (

                <div className="outline outline-[lightgray] outline-[2px]  flex justify-between items-center  gap-1 p-2 rounded-lg m-4 " >

                    <div className=" flex w-32 h-32 bg-gray-300 shrink-0 mx-2 ">
                        <img src={house.images[0]} alt="" />
                    </div>
                    <div className="grow-0 shrink px-1  p-1 mr-3">
                        <h2 className="text-xl">{house.title}</h2>
                        <p className="text-sm mt-2 line-clamp-3">{house.description}</p>
                        <div className="flex justify-start gap-8">
                            <p><IoBedOutline /> {house.bedRoom}</p>
                            <p><FaShower /> {house.bathRoom}</p>
                            <p><TfiRulerAlt2 /> {house.area}m<sup>2</sup></p>
                            <p className=" flex justify-center items-center font-semibold" >{house.homeType}</p>

                            {/* For verified */}
                            <p className='flex'>
                                <div className="ml-3 flex justify-center items-center">
                                    <svg
                                        className={`w-4 h-4 mr-1.5 ${house.verified ? 'text-[#38A169]' : 'text-[#DC2626]'}   dark:text-green-400 flex-shrink-0`}
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
                                    <p> {house.verified ? 'Verified' : 'Not Verified'} </p>
                                </div>
                            </p>

                            {/* for Suspended */}
                            <p className='flex'>
                                <div className="ml-3 flex justify-center items-center">
                                    <svg
                                        className={`w-4 h-4 mr-1.5 ${house.suspended ? 'text-[#38A169]' : 'text-[#DC2626]'}   dark:text-green-400 flex-shrink-0`}
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
                                    <p> {house.suspended ? 'Suspended' : 'Not Suspended'} </p>
                                </div>
                            </p>
                        </div>

                    </div>

                    <select
                        value={selectedOption}
                        className=" outline mr-3 bg-lightBlue hover:bg-lbHover text-white py-2 px-2 rounded"
                        onChange={(e) => {
                            handleSelect(e.target.value, house._id, { verified: house.verified, suspended: house.suspended })
                        }}
                    >
                        <option value="">Select Action</option>
                        <option value="verify">
                            {house.verified ? 'Unverify' : 'verify'}
                        </option>
                        <option value="suspend">
                            {house.suspended ? 'UnSuspend' : 'Suspend'}
                        </option>

                    </select>

                </div>
            )
            )}
        </div>
    </>


}

const HomesListPage = ({ DisplayRented }) => {
    const { HousesList, setHousesList } = useContext(UtilityContext);

    useEffect(() => {
        axios
            .get("http://localhost:4000/houses/all")
            .then((response) => {
                console.log(" admin is logged in and houses is ");
                console.log(response.data);
                setHousesList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    let RentedList = []
    useEffect(() => {
        RentedList = HousesList.filter(house => house.isRented === true)
    }, [RentedList, HousesList])

    return (
        <>
            {DisplayRented ? <HomeLister objectList={RentedList} /> : <HomeLister objectList={HousesList} />}
        </>
    );
};

export default HomesListPage
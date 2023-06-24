import React, { useContext, useId } from 'react';
import { UserContext } from '../contexts/UserContextProvider';
import { UtilityContext } from '../contexts/UtilityContextProvide';
import axios from 'axios';

const UserLister = ({ AccountListType }) => {

  const { token } = useContext(UserContext)
  const { TenantList, setTenatList, OwnersList, setOwnersList, BuyersList, setBuyerList } = useContext(UtilityContext)
  var users = [];
  if (AccountListType === 'owner')
    users = OwnersList
  else if (AccountListType === 'buyer')
    users = BuyersList
  else if (AccountListType === 'tenant')
    users = TenantList

  function handleActionChange(userId, action) {

    let userType = ''
    if (AccountListType === 'owner')
      userType = 'owner'
    else if (AccountListType === 'buyer')
      userType = 'buyer'
    else if (AccountListType === 'tenant')
      userType = 'tenant'


    if (action === 'delete') {

      axios
        .delete(
          `${process.env.REACT_APP_baseURL}/${userType}/delete/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {


          if (userType === 'owner') {
            const fileredOwners = OwnersList.filter(
              (owner) => owner._id !== userId
            );
            setOwnersList(fileredOwners);
            console.log("Owner with " + useId + " is deleted");

          }
          else if (userType === 'tenant') {

            const filteredTenant = TenantList.filter(
              (tenant) => tenant._id !== userId
            );
            setTenatList(filteredTenant);
            console.log('TENATNT WITH ' + userId + "  is deleted");
          }

          else if (userType === 'buyer') {
            const filteredBuyer = BuyersList.filter(
              (tenant) => tenant._id !== userId
            );
            setBuyerList(filteredBuyer);
            console.log('buyer WITH ' + userId + "  is deleted");

          }
          // return <Navigate to={"/homeOwner/homes/onListing"} />;
        })
        .catch((error) => {
          console.log("Error on deleting house");
          console.log(error.message);
        });

    }
  }


  return (
    <div>
      {users.length > 0 && users.map((user) => (
        <div key={user.id} className=" outline 11/12 mx-auto  rounded flex flex-row items-center mb-3">
          <div className="outline bg-gray-300">
            <img
              src={"https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg"}
              alt={user.name}
              className="w-36 h-auto object-cover"
            />
          </div>

          <div className="outline ml-2 flex justify-evenly gap-x-1 ">
            <div className=''>
              <p>First Name: <span className="ml-1 text-base font-semibold">{user.name}</span></p>
              <p>
                Last Name: <span className="ml-1 text-base font-semibold">{user.lastName}</span>
              </p>
            </div>

            <div className='outline ml-2'>
              <p>
                Email: <span className=" outline ml-1 text-base font-semibold">{user.email}</span>
              </p>
              <p>
                Acc. Status: <span className=" ml-1 text-base font-semibold"> {user.accountStatus} </span>
              </p>
            </div>

            <div className='outline ml-2'>
              <p>
                City:<span className="ml-1 text-base font-semibold">{user.city}</span>
              </p>
              <p>
                Subcity: <span className="ml-1 text-base font-semibold">{user.subcity}</span>
              </p>
            </div>


            <div className='mx-2'>
              <p>
                Kebele: <span className="ml-1 text-base font-semibold">{user.kebele}</span>
              </p>
              <p>
                Phone: <span className="ml-1 text-base font-semibold">{user.phone}</span>
              </p>
            </div>

          </div>

          <select
            className="mx-auto bg-lightBlue hover:bg-lbHover text-white py-2 px-1 rounded"
            onChange={(e) => handleActionChange(user.id, e.target.value)}
          >
            <option value="">Select Action</option>
            <option value="delete">Delete</option>
            <option value="verify">Verify </option>
            <option value="suspend">Suspend</option>

          </select>
        </div>
      ))}
    </div>

  );
};

export default UserLister;

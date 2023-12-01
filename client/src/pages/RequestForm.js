import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContextProvider";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import { useNavigate, useParams } from "react-router-dom";

const RequestForm = () => {
    const {appId} = useParams();
    const { user, token } = useContext(UserContext);
    const {applications} = useContext(UtilityContext);
    const navigate  = useNavigate()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  
    const app = applications.filter((app) => app._id === appId)[0]
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // data payload to be sent
      // payload.title = title
      // payload.description = description
      const mRequestData = {
        homeId: app.homeId._id,
        ownerId: app.ownerId._id,
        tenantId: app.applicantId._id,
        title: title,
        message: description,
      };
      // const mRequestData = {}
      axios
        .post(`https://house-rental.onrender.com/maintenance/send`, mRequestData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(user._id);
          console.log("Maintenance request saved successfully");
          navigate('/tenant/mRequest') // navigate to after sending request
          setTitle("");
          setDescription("");
        })
        .catch((error) => {
          console.log("Error saving house");
          console.log(error);
        });
      console.log("Title:", title);
      console.log("Description:", description);
    };
  
    return (
        <>
        <h2 className="w-full text-center mb-4">Maintenance request form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="bg-lightBlue p-2 rounded" type="submit">
          Submit
        </button>
      </form>
      </>
    );
  };

export default RequestForm;
// import React, { useContext, useState } from "react";
import axios from 'axios';
import {UserContext} from "../../contexts/UserContextProvider";
import { useContext, useState } from 'react';

const Login = () => {

    const [person, setPerson] = useState({
        email: "",
        password: ""
    });
    const {setLoggedin, isLogged} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ person });

        setLoggedin(true);
        if(isLogged){
            console.log(" yes loggged in");
        }
        
        
        
        
        axios.post('http://localhost:4000/houses/all')
            .then(response => {
                console.log(response); // Do something with the response data here
                

            })
            .catch(error => {
                console.error(error); // Handle any errors here
            });



    }



    return (
        <div className='outline w-8/12 mx-auto px-8 py-2'>


            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="text" value={person.email} onChange={(event) => setPerson({ ...person, email: event.target.value })} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={person.password} onChange={(event) => setPerson({ ...person, password: event.target.value })} />
                </label>
                <br />
                <button className='bg-lightBlue text-white p-2 rounded-xl' type="submit">Login</button>
            </form>
        </div>

    )
};

export default Login;

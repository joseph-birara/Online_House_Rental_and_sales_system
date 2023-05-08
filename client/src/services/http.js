import axios from "axios";
const baseUrl = "http://localhost:4000";

// Register User
export const registerUser = (userInfo, userType, token) => {
    axios.post(`${baseUrl}/${userType}/register`, userInfo, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        // console.log(response);
        return response;
    }).catch((error) => {
        console.log(error);
    });
};

// getall user
export const getAllUser = (userType) => {
    axios.get(`${baseUrl}/${userType}`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
        });
};

// get specific user
export const getSpecificUser = (userId, token) => {
    axios
        .get(`${baseUrl}/get/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
};

// log in
export const login = (userInfo, token, userType) => {
    axios
        .post(`${baseUrl}/${userType}/register`, userInfo, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
        });
};

// to update user
export const updateUser = (userInfo, userType, token) => {
    axios
        .patch(`${baseUrl}/${userType}/register`, userInfo, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
        });
};

// to delete user
export const deleteUser = (userType, userId, token) => {
    axios
        .post(`${baseUrl}/update/${userId}`, userId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
        });
};





// HOUSES
// add home
export const addHouse = (houseData, token) => {
    axios
        .post(`${baseUrl}/houses/add`, houseData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
        });
};











// get all houses
export const getAllHouses = () => {

    axios
        .get(`http://localhost:4000/houses/all`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });

};
















// get homes of owner
export const getOwnerHouses = (ownerID) => {
    axios
        .post(`${baseUrl}/houses/owner/${ownerID}`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
        });
};

// get single house
export const getSingleHouse = (houseId) => {
    axios
        .post(`${baseUrl}/houses/${houseId}`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
        });
};

// delete houses
export const deleteHouse = (houseId, token) => {
    axios.delete(`${baseUrl}/houses/delete/${houseId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error);
    });
};

// update houses
export const updateHouse = (housedata, houseId, token) => {
    axios.post(`${baseUrl}/houses/update/${houseId}`, housedata, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error);
    });
};




// for COMMENT

// get comment by owner
export const getCommnetbyOwner = (userId, token) => {
    axios.post(`${baseUrl}/comment/getByOwner/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error);
    });
}

// get comment by house
export const getCommentByHouse = (houseId, token) => {
    axios.post(`${baseUrl}/comment/getbyhouse/${houseId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error);
    });
}

// post comment
export const createComment = (houseComment, token) => {
    axios.post(`${baseUrl}/comment/add`, houseComment, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error);
    });
}

// update comment
export const updateComment = (houseComment, token) => {
    axios.post(`${baseUrl}/comment/edit`, houseComment, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error);
    });
}

// delete comment
export const deleteComment = (commentID, token) => {
    axios.post(`${baseUrl}/comment/delete/${commentID}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error);
    });
}







// for Mentenance

// create maintenance
export const createMaintenance = (maintenancedata, token) => {
    axios.post(`${baseUrl}/maintenance/send`, maintenancedata, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error);
    });
}

// update maintenance
export const updateMaintenance = (maintenancedata, token) => {
    axios.put(`${baseUrl}/maintenance/edit`, maintenancedata, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error);
    });


}

// to get specific maintenance
export const getSpecificMaintenance = (maintenanceId) => {
    axios.put(`${baseUrl}/maintenance/single/${maintenanceId}`).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error);
    });

}

// delete maintenance
// export const delteMaintenance = (main)
// export const login =( )

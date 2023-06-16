let user_token = ''
let user_profile_data = ''
const RetriveLocallyStoredData = () => {

    // Retrieve data from local storage
    user_profile_data = window.localStorage.getItem('user-token')
    user_token = window.localStorage.getItem('user-profile-data')

    // Return any values or functions you want to expose to the component
    return {
        user_token, user_profile_data
    };
};

export default RetriveLocallyStoredData;
let user_token = ''
let user_data = ''
const RetriveLocallyStoredData = () => {

    // Retrieve data from local storage
    user_token = window.localStorage.getItem('user-token')
    user_data = window.localStorage.getItem('user-data')

    // Return any values or functions you want to expose to the component
    return {
        user_token, user_data
    };
};

export default RetriveLocallyStoredData;
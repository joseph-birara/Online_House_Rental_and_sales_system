import { getStoredSession } from "../../utils/auth";

const RetriveLocallyStoredData = () => {
    const { token, user } = getStoredSession();
    return {
        user_token: token ? JSON.stringify(token) : null,
        user_data: user ? JSON.stringify(user) : null,
    };
};

export default RetriveLocallyStoredData;

import { createContext, useContext, useState, useEffect } from "react";
import { getUserData } from "../services/authService.js";

const UserContext = createContext(() => {});

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
    return useContext(UserContext);
}

function UserProvider({ children }) {

    const [ userData, setUserData ] = useState({
        email: "",
        username: "",
        id: "",
    })

    const [ isUserLoading, setIsUserLoading ] = useState(true);

    useEffect(() => {
        const fetchUserData = async() => {
            try {
                const data = await getUserData();
                setUserData({
                    id: data.user_id,
                    username: data.username,
                    email: data.email
                })
            } catch {
                setUserData({
                    email: "",
                    username: "",
                    id: "",
                });
            } finally {
                setIsUserLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return(
        <UserContext.Provider value={{ 
            userData, 
            setUserData, 
            isUserLoading
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
import { createContext, useContext, useState } from "react";

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

    return(
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
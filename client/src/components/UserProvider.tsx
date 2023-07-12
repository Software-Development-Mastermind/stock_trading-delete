import { useState, useEffect } from "react";
import { UserContext } from "@/utils";

function UserProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return(

    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>

  );
}

export default UserProvider;
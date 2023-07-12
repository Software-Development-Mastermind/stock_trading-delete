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

  useEffect(() => {
    if (user) {
      console.log(`User at the provider level: ${user}`);
      console.log(`User email at the provider level: ${user.email}`);
      console.log(`User id at the provider level: ${user.id}`);
    }
  }, [user]);

  return(

    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>

  );
}

export default UserProvider;
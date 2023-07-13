import { createContext } from 'react';

const currentUser = JSON.parse(localStorage.getItem('user')) || null;

const UserContext = createContext(currentUser);

export default UserContext;

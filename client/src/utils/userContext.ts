import { createContext } from 'react';
import { User } from './types';

const storage = localStorage.getItem('user');
const currentUser = JSON.parse(storage || '{}') || null;

const UserContext = createContext<User>(currentUser);

export default UserContext;

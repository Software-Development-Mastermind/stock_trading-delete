import { createContext } from 'react';
import { User } from './types';

const storage = localStorage.getItem('user');
const currentUser = JSON.parse(storage || '{}');

const UserContext = createContext<User | null>(currentUser as User | null);

export default UserContext;

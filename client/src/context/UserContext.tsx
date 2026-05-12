import { createContext, useState } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react'
import type { User } from "../types/index";

export interface UserContextProps {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

const defaultState: UserContextProps = {
    user: null,
    setUser: () => {}
};

export const UserContext = createContext(defaultState);

interface UserProviderProps {
    children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
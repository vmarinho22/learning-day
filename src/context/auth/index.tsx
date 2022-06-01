import api from '@services/api';
import cookies from '@services/cookies';
import { createContext, useContext, useState } from 'react';
import { UserType } from '../../types/defaultTypes';

export const AuthContext = createContext({});

const AuthProvider: any = ({ children }: any) => {
    const [user, setUser] = useState<UserType | undefined>();
    const [token, setToken] = useState<string>('');
    const { setNewCookie, deleteCookie, getCookie } = cookies();

    const handleSetUser = (user: UserType | undefined) => {
        setUser(user);
    }

    const handleSetToken = (token: string) => {
        setToken(token);
    }

    const getUser = () => {
        const user = getCookie('client', 'user');
        return user;
    }

    const getToken = () => {
        const token = getCookie('client', 'token');
        return token;
    }

    const signup = async (user: string, password: string) => {
        const response = await api.post('/auth/login/', {user, password});
        if (response.status !== 200) {
            return false;
        }

        // Cookies
        setNewCookie('client','token', response.data.token);
        setNewCookie('client', 'user', response.data.user);

        // Hooks
        handleSetUser(response.data.user);
        handleSetToken(response.data.token);
    }

    const logout = () => {
        try {
            deleteCookie('client', 'token');
            deleteCookie('client', 'user');
    
            handleSetUser(undefined);
            handleSetToken('');

            return true;
        } catch (error) {
            return false;
        }
    }
    
    return (
        <AuthContext.Provider value={{
            getUser,
            token,
            signup
        }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};
  
export { AuthProvider, useAuth };
  
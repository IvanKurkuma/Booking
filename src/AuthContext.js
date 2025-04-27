import React, {createContext, useState, useContext} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [authData, setAuthData]=useState({
        email:'',
        password:'',
        again_password:''
    });

    const updateAuthData=(field, value)=>{
        setAuthData(prev=>({
            ...prev,
            [field]:value
        }));
    };

    const resetAuthData=()=>{
        setAuthData({
            email:'',
            password:'',
            again_password:''
        })
    }

    return (
        <AuthContext.Provider value={{authData, updateAuthData, resetAuthData}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth=()=>{
    const context=useContext(AuthContext)
    if(!context){
        throw new Error('err');
    }
    return context;
}
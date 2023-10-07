// src/context/state.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AppContext = createContext();
// var currentUser='hello world'
// async function getUser(){
//     var {data} = await axios.get("/api/users/currentUser");
//     console.log(data);
//     currentUser=data;
// }
// getUser();

// console.log(currentUser);



export function AppWrapper({children}) {
    const [currentUser,setCurrentUser] = useState(null);
    useEffect(() => {
        async function getUser(){
        var {data} = await axios.get("/api/users/currentUser");
        console.log(data);
        setCurrentUser(data);
        }
        getUser();
    },[]);

    if(!currentUser){
        return "";
    }else{
        return (
            <AppContext.Provider value={currentUser}>
              {children}
            </AppContext.Provider>
          );
    }
}

export function useAppContext() {
  return useContext(AppContext);
}
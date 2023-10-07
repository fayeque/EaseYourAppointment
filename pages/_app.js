import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useReducer, useState } from 'react';
import Header from '../components/header';
import { AppWrapper } from '../context/state';
import Alert from '../components/alert';
import 'tailwindcss/tailwind.css'
import '../styles/roots.css';
// import axios from 'axios';

export const StateContext = React.createContext();

const initialState = {
  currentUser:null,
  errors:null,
  success:null
}

if(typeof window !== 'undefined'){
 initialState = {
  currentUser:localStorage.getItem("currentUser"),
  errors:null,
  succes:null
}
}

console.log("outside initial state in -app",initialState);

const reducer = (state,action) => {
  var {type,payload} = action;
  console.log("payload in _app",payload);
  switch(type){
    case 'authenticate':
      localStorage.setItem("currentUser",payload);
      return {
        ...state,
        currentUser:payload
      };
    case 'unauthenticate':
      localStorage.removeItem('currentUser');
      return {
        ...state,
        currentUser:null
      }
    case 'setErrors':
      // state.errors.push(payload);
      return {...state,errors:payload};
    case 'removeErrors':
      return {...state,errors:null}
    case 'setSuccess':
      return {...state,success:payload}
    case 'removeSuccess':
      return {...state,success:null}
    case 'loadUser':
      return {...state,currentUser:localStorage.getItem("currentUser")}
    default:
      return state;
  }
}

// console.log("buildClient here is " ,buildClient());
// buildClient();

const AppComponent = ({ Component,pageProps}) => {
  const [count,dispatch] = useReducer(reducer,initialState);
  // console.log("initial state in -app",initialState);
  axios.defaults.baseURL="https://easeyourappointmentbackend.onrender.com";
  axios.defaults.withCredentials=true;
  axios.defaults.headers={
    'Content-Type':'application/json'
};
  // console.log(pageProps);
  return (
      <StateContext.Provider value={{count:count,dispatch:dispatch}}>
        <Alert />
        <Header />
        <Component pageProps={pageProps}/>
      </StateContext.Provider>
  );
};
export default AppComponent;

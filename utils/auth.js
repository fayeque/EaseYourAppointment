import axios from "axios";
import { useContext } from "react";
import {StateContext} from "../pages/_app";

export async function login(email,password){
    const stateContext = useContext(StateContext);
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email,password});

    try{
        const res=await axios.post("/users/patient/signin",body,config);
        stateContext.dispatch({
            type:'authenticate',
            payload:res.data
        })
    }catch(err){
        const errors=err.response.data.errors;
        console.log(errors);
        // if(errors){
        //     errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        // }
        // dispatch({
        //     type:LOGIN_FAIL
        // })
    }
}
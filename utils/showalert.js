
import { useContext } from "react";
import { StateContext } from "../pages/_app";

export function showErrorAlert(dispatcher,type,data){
    // const stateContext = useContext(StateContext);

    dispatcher({
        type:type,
        payload:data
    });

    setTimeout(() => {
        dispatcher({
            type:'removeErrors',
            payload:null
        })
    },2000);

}

export function showSuccessAlert(dispatcher,type,data){
    dispatcher({
        type:type,
        payload:data
    });

    setTimeout(() => {
        dispatcher({
            type:'removeSuccess',
            payload:null
        })
    },2000);
}
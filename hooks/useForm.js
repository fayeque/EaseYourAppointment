import { useState } from "react";

export const useForm = (initialInput) => {
    console.log("useForm getting called ");
    const [formState, setFormState] = useState(initialInput);
    console.log("formstate in useform " , formState);
    const inputHandler = (id, value) => { 
        console.log("id and value in useForm " ,id , value);
        
        setFormState({...formState,[id]:value});
    }

    return [formState, inputHandler];
}
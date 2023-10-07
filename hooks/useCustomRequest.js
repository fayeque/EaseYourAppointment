import axios from "axios";

export default ({url,method,stateContext,onSuccess}) => {
    const config={
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials: true
    };
    const doRequest = async (body) => {
        try{
            const response=await axios[method](url,body,config);
            stateContext.dispatch({
                type:'authenticate',
                payload:response.data
            });
            console.log("in ignin response",response.data);
            if(onSuccess){
                onSuccess();
            }
        }catch(err){
            console.log("in error of useRequest " , err);
            const errors=err.response.data.errors;
            console.log(errors);
            if(errors){
                // errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
                stateContext.dispatch({
                  type:'setErrors',
                  payload:errors
                });
  
                setTimeout(() => {
                  stateContext.dispatch({
                    type:'removeErrors',
                    payload:null
                  })
                },2000)
            }
        }

    };
        return doRequest;
}
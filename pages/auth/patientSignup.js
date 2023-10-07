import { useContext,useState} from "react";
import { StateContext } from "../_app";
import Router from 'next/router';
import Link from "next/link";
import { login } from "../../utils/auth";
import axios from "axios";
import { LockClosedIcon } from '@heroicons/react/solid';

 function PatientSignup(){
    var stateContext=useContext(StateContext);
    console.log("In signin form",stateContext);
    const  [formData,setformData] = useState({
        email:"",
        password:""
      });
    
      const {email,password} = formData;
    
      const onChange=e => setformData({...formData,[e.target.name]:e.target.value});

      const signup = async (email,password) => {
        const config={
          headers:{
              'Content-Type':'application/json'
          }
      }
      const body = JSON.stringify({email,password});
  
      try{
          const response=await axios.post("/api/users/patient/signup",body,config);
          stateContext.dispatch({
              type:'authenticate',
              payload:response.data
          });
          console.log("in ignin response",response.data);
          Router.push("/");
      }catch(err){
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
          // dispatch({
          //     type:LOGIN_FAIL
          // })
      }
      }
    
      const onSubmit = (e) => {
        e.preventDefault();
        signup(email,password);
      }
    
    if(typeof window !== 'undefined' && stateContext.count.currentUser){
      Router.push("/");
    }
    
  return (

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <p className="font-medium text-black-600 hover:text-indigo-500">
                Already registered sign in here <Link href="/auth/patientSignin">Signin</Link>
              </p>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  value={email} onChange={(e) => onChange(e)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  value={password} 
                  onChange={(e) => onChange(e)}
                  minLength="6"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}



    

export default PatientSignup;
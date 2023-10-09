import { useContext,useState} from "react";
import { StateContext } from "../_app";
import Router from 'next/router';
import Link from "next/link";
import { login } from "../../utils/auth";
import axios from "axios";
import { LockClosedIcon } from '@heroicons/react/solid';
import Input from "../../components/input";
import { useForm } from "../../hooks/useForm";

 function PatientSignin(){
    var stateContext=useContext(StateContext);
    
    const [formState,inputHandler] = useForm({
      email:"",
      password:""
    });



      const login = async (email,password) => {
      //   const config={
      //     headers:{
      //         'Content-Type':'application/json',
      //         'Authorization':`Bearer ${JSON.parse(localStorage.getItem('currentUser'))?.jwtToken}`
      //     },
      //     withCredentials: true
      // }
      const body = JSON.stringify({email,password});
  
      try{
          const response=await axios.post("/api/users/patient/signin",body
          // ,config
          );
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
        console.log("formState " , formState);
        login(formState.email,formState.password);
      }
    
    // if(typeof window !== 'undefined' && stateContext.count.currentUser){
    //   Router.push("/");
    // }
    
  return (

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <p className="font-medium text-indigo-600 hover:text-indigo-500">
                Not registered yet register here <Link href="/auth/patientSignup">Signup</Link>
              </p>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}
            <div className="rounded-md shadow-sm -space-y-px">
              <Input type="email" name="email" id="email" placeholder="email" minLength="5" onInput={inputHandler} />
              <Input type="password" name="password" id="password" placeholder="password" minLength="6" onInput={inputHandler} />
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
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}


















        // <div>
        // <section class="container">
        // <h1 class="large text-primary">Sign In</h1>
        // <p class="lead"><i class="fas fa-user"></i> Sign in to your Your Account</p>
        // </section>
        // <section>

      

        // <form class="form" onSubmit={e => onSubmit(e)}>
        //   <div class="form-group">
        //     <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => onChange(e)}/>
        //   </div>
        //   <div class="form-group">
        //     <input
              // type="password"
              // placeholder="Password"
              // name="password"
              // value={password} 
              // onChange={(e) => onChange(e)}
              // minLength="6"
        //     />
        //   </div>
        //   <input type="submit" class="btn btn-primary" value="Login" />
        // </form>
        // <p class="my-1">
        //  Not have an account? <Link href="/register">Signup</Link>
        // </p>
        // </section>
        // </div>
    

export default PatientSignin;
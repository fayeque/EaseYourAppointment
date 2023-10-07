import { useContext,useState} from "react";
import { StateContext } from "../_app";
import Router from 'next/router';
import useCustomRequest from "../../hooks/useCustomRequest";
import Link from "next/link";
import { login } from "../../utils/auth";
import { LockClosedIcon } from '@heroicons/react/solid';
import axios from "axios";


export default function DoctorSignin(){

    var stateContext=useContext(StateContext);
    console.log("In signin form",stateContext);
    const  [formData,setformData] = useState({
        email:"",
        password:""
      });

      const doRequest = useCustomRequest({
        url:"/api/users/doctor/signin",
        method:"post",
        stateContext:stateContext,
        onSuccess : () => {
          Router.push("/doctor/dashboard");
          
        }
      });
      
      const {email,password} = formData;
    
      const onChange=e => setformData({...formData,[e.target.name]:e.target.value});

      const login = async (email,password) => {

      const body = JSON.stringify({email,password});
          await doRequest(body);    
      }
    
      const onSubmit = (e) => {
        e.preventDefault();
        login(email,password);
      }
    
    if(typeof window !== 'undefined' && stateContext.count.currentUser && stateContext.count.currentUser.userRole == 0){
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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <button className="font-medium text-indigo-600 hover:text-indigo-500">
                  <Link href="/auth/doctorSignup">Not registered yet Signup</Link>
              </button>
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
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
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
import { useContext,useState} from "react";
import { StateContext } from "../_app";
import Router from 'next/router';
import Link from "next/link";
import { login } from "../../utils/auth";
import { LockClosedIcon } from '@heroicons/react/solid';
import axios from "axios";
import Chamber from "../../components/chamber";


export default function DoctorSignup(){

    var stateContext=useContext(StateContext);
    console.log("In signin form",stateContext);
    const  [formData,setformData] = useState({
        email:"",
        name:"",
        password:"",
        passcode:"",
        speciality:""
      });
    const [chambers,setChambers] = useState([
      {
        address:"",
        from:"",
        to:"",
        weekdays:null,
        index:null
    }
  ]);
    
      const {email,name,password,passcode,speciality} = formData;
    
      const onChange=e => setformData({...formData,[e.target.name]:e.target.value});

      const onChambersChange = (e) => {
        setChambers({...chambers,[e.target.name]:e.target.value})
      }
      console.log("chambers till now",chambers);


      const signup = async (obj) => {
        const config={
          headers:{
              'Content-Type':'application/json'
          }
      }
      const body = JSON.stringify(obj);
  
      try{
          const response=await axios.post("/api/users/doctor/signup",body,config);
          stateContext.dispatch({
              type:'authenticate',
              payload:response.data
          });
          console.log("in ignin response",response.data);
          Router.push("/doctor/dashboard");
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
        var obj={...formData,chambers:chambers}
        console.log(obj);
        signup(obj);
      }
    
    if(typeof window !== 'undefined' && stateContext.count.currentUser && stateContext.count.currentUser.userRole == 0){
      Router.push("/");
    }
    
    const setChamberInParent = (chamber) => {
      if(chambers.length > chamber.index){
        chambers[chamber.index] = chamber;
      }else{
        chambers[chambers.length] = chamber;
      }

      console.log("chambers in parent",chambers);
    }

    const addChamber = () => {
      setChambers([...chambers,{
      address:"",
      from:"",
      to:"",
      index:null}])
    }

    const removeChamberInParent = (i) => {
      chambers.splice(i,1);
      setChambers([...chambers]);
      
    }
    console.log("total cahmbers",chambers);
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
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
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
                <label htmlFor="email-address" className="sr-only">
                    Name
                </label>
                <input
                  value={name} onChange={(e) => onChange(e)}
                  id="email-address"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
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
            <div>
                <label htmlFor="email-address" className="sr-only">
                  Passcode
                </label>
                <input
                  value={passcode} onChange={(e) => onChange(e)}
                  id="passcode"
                  name="passcode"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Passcode"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Speciality
                </label>
                <input
                  value={speciality} onChange={(e) => onChange(e)}
                  id="speciality"
                  name="speciality"
                  type="speciality"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Speciality"
                />
              </div>
                <label>
               Chambers
              </label>
              {chambers.map((chamber,i) => {
                return <Chamber key={i} c={chamber} setChamberInParent={setChamberInParent} removeChamberInParent={removeChamberInParent} index={i} />
              })}

              <button onClick={addChamber}>Add more chamber</button>
             
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
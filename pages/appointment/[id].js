import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../_app';
import { useRouter } from 'next/router'
import axios from 'axios';
import {flash} from "react-universal-flash";
import { showErrorAlert,showSuccessAlert } from '../../utils/showalert';

export default function Appointment(){
    const stateContext = useContext(StateContext);
    const router = useRouter()
    var doctorId = router.query.id;
    console.log("doctorrr id",doctorId);

    const [doctor,setDoctor] = useState(null);

    const [selectedOption, setSelectedOption] = useState(null);
    useEffect(() => {
        async function getUser(){
            try{
              const config={
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials: true
            }
                const {data} = await axios.get("/api/users/currentUser",config);
                console.log("Data in appointment",data);
                if(!data.currentUser){
                    Router.push("/");
                    stateContext.dispatch({
                        type:'unauthenticate',
                        payload:""
                    });

                    showErrorAlert(stateContext.dispatch,'setErrors',[{message:'Please login first'}])
                    
                }else{
                    stateContext.dispatch({
                        type:'authenticate',
                        payload:data.currentUser
                    });
                }
                

            }catch(err){
                console.log(err);
            }
        }
        getUser();
    },[]);

    useEffect(() => {
        async function getDoctor(){
            if(doctorId){
            const res=await axios.get(`/api/users/${doctorId}`);
            console.log("data in appointment",res.data);
            setDoctor(res.data);
            }
        }
        getDoctor();
    },[doctorId]);

    console.log("rendering....");

    const onSubmit =async (e) => {
        e.preventDefault();
        console.log(e.target.date.value);
        console.log(new Date(e.target.date.value));
        var obj={};
        obj.name=e.target.pname.value;
        obj.address=e.target.paddress.value;
        obj.mobile = e.target.pmnumber.value;
        var d=new Date(e.target.date.value);
        obj.date=d.toString();
        obj.time=selectedOption;
        console.log("obj on submitting",obj);
        const config={
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials: true
        }
        const body = JSON.stringify(obj);
        try{
        var res=await axios.post(`/api/appointment/${doctorId}`,body,config);
        console.log(res.data);
        var obj={message:res.data};
        var arr=[];
        arr.push(obj);
        showSuccessAlert(stateContext.dispatch,'setSuccess',arr);
        Router.push("/");
        }catch(err){
            console.log(err.response);
            window.scrollTo(0,0);
            showErrorAlert(stateContext.dispatch,'setErrors',err.response.data.errors);
        }

    }


    return (

        <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Book appointment</h3>
              <h3 className="text-lg font-medium leading-6 text-gray-900">{doctor && doctor.name}</h3>
              {doctor && doctor.chambers.map((d,i) => {
                  return (
                    <p key={i} className="mt-1 text-sm text-gray-600">Sits from {d.timing} on {d.weekdays.map((w,i) => { return ( w  + ",")})}</p>
                  )
              })}
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={onSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Patient Name
                      </label>
                      <input
                        type="text"
                        name="pname"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Patient Address
                      </label>
                      <input
                        type="text"
                        name="paddress"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        name="pmnumber"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Date of Booking
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="email-address"
                        autoComplete="date"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Timing
                      </label>
                      <select
                        required 
                        name='timing'
                        onChange={(e) => setSelectedOption(e.target.value)} 
                        value={selectedOption}
                        id="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                         <option value="">--Select a time--</option>
                        {doctor && doctor.chambers.map((chamber,i) => {
                        return (<option key={i} value={chamber.timing}>{chamber.timing}</option>)
                        })}
                      </select>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
                    </div>
                    </div>
                </div>
            </form>
          </div>
        </div>
      </div>
    )
}
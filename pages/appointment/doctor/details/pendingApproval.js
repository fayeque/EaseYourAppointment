import { useRouter } from "next/router";
import useSWR,{ useSWRConfig } from "swr";
import { useContext} from 'react';
import { StateContext } from '../../../_app';
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { showErrorAlert,showSuccessAlert } from '../../../../utils/showalert';

const fetcher = async (url) => {
    try{
    const config={
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials: true
    }
    var {data}=await axios.get(url,config);
    return data;
    }catch(err){
        const error = new Error('An error occurred while fetching the data.')
        error.info = data;
        error.status = data.status;
        throw error
    }
}

export default function DoctorAppnDetails(){
    const stateContext = useContext(StateContext);
    const { mutate } = useSWRConfig()
    const router = useRouter();
    var appnId = router.query.id;
    const [appn,setAppn] = useState(true);
    const {data,error} = useSWR("/api/doctor/appointments/pending",fetcher);
    console.log("data here is ",data)

    if(!data){
        if(error && error.status == 401){
            return  (
                <div>
                    <p>Please login first</p>
                    <Link href="/auth/doctorSignin">Signin</Link>
                </div>
                )
        } 
        return <p>Loading...</p>
    }

    const handleApprove = async (uniqueId) => {
        try{
            var {data} = await axios.post(`/api/patient-appointment/${uniqueId}/approve`);
            var obj={message:data}; 
            var arr=[];
            arr.push(obj);
            showSuccessAlert(stateContext.dispatch,'setSuccess',arr);
            mutate("/api/doctor/appointments/pending");

            }catch(err){
                console.log(err);
            }
    }
    const handleReject = async (uniqueId) => {
        try{
            var {data} = await axios.post(`/api/patient-appointment/${uniqueId}/reject/`);
            mutate("/api/doctor/appointments/pending");
            }catch(err){
                console.log(err);
            }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-4 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 7v-7" /></svg>
                        Pending Appointment Details
                    </h1>
                    <p className="text-gray-600 text-base">Approve or Reject pending appointments</p>
                </div>

                {/* Appointments Table Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Pending Appointments
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Mobile No.</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {data.map((person, i) => (
                                    <tr key={i} className="hover:bg-indigo-50 transition duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 font-semibold">{i + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-md font-medium text-gray-700">{person.patientName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{person.mobile}</div>
                                        </td>
                                         <td className="px-6 py-4 whitespace-nowrap">
                                            
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                                                        {format(new Date(person.date), "dd-MMM-yyyy").toUpperCase()}
                                                </span> 
                                            
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                                                            {person.timing}
                                                </span> 
                                            
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                             <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition" onClick={() => {handleApprove(person._id)}}>Approve</button>
                                             <button className="ml-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition" onClick={() => {handleReject(person._id)}}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
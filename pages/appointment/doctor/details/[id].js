import { useRouter } from "next/router";
import useSWR,{ useSWRConfig } from "swr";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

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
    const { mutate } = useSWRConfig()
    const router = useRouter();
    var appnId = router.query.id;
    const [appn,setAppn] = useState(true);
    const {data,error} = useSWR(`/api/appointment/doctor/${appnId}`,fetcher);

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

    const handleComplete = async (uniqueId) => {
        try{
        var {data} = await axios.get(`/api/appointment/completed/${appnId}/${uniqueId}`);
        mutate(`/api/appointment/doctor/${appnId}`);
        }catch(err){
            console.log(err);
        }
    }
    const handleUndo = async (uniqueId) => {
        try{
            var {data} = await axios.get(`/api/appointment/undo/${appnId}/${uniqueId}`);
            mutate(`/api/appointment/doctor/${appnId}`);
            }catch(err){
                console.log(err);
            }
    }
    const handleInvisit = async (uniqueId) => {
        try{
            var {data} = await axios.get(`/api/appointment/invisit/${appnId}/${uniqueId}`);
            mutate(`/api/appointment/doctor/${appnId}`);
            }catch(err){
                console.log(err);
            }
    }
    const handleReject = async (uniqueId) => {
        try{
            var {data} = await axios.get(`/api/appointment/rejected/${appnId}/${uniqueId}`);
            mutate(`/api/appointment/doctor/${appnId}`);
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
                        Appointment Details
                    </h1>
                    <p className="text-gray-600 text-base">Manage and update your patient queue</p>
                </div>

                {/* Stats Card */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center border border-gray-100">
                        <span className="text-xs text-gray-500 mb-1">Total</span>
                        <span className="text-2xl font-bold text-indigo-600">{data.total}</span>
                    </div>
                    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center border border-gray-100">
                        <span className="text-xs text-gray-500 mb-1">Completed</span>
                        <span className="text-2xl font-bold text-green-600">{data.completed}</span>
                    </div>
                    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center border border-gray-100">
                        <span className="text-xs text-gray-500 mb-1">Pending</span>
                        <span className="text-2xl font-bold text-yellow-600">{data.pending}</span>
                    </div>
                    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center border border-gray-100">
                        <span className="text-xs text-gray-500 mb-1">Current</span>
                        <span className="text-2xl font-bold text-blue-600">{data.currentVisiting === -1 ? 'Waiting' : data.currentVisiting}</span>
                    </div>
                </div>

                {/* Appointments Table Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Patient Queue
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Mobile No.</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {data.appointments.map((person, i) => (
                                    <tr key={i} className="hover:bg-indigo-50 transition duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 font-semibold">{i + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-md font-medium text-gray-700">{person.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{person.mobile}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {(() => {
                                                if(person.status == 'pending'){
                                                    return (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                                                            {person.status}
                                                        </span> 
                                                    );
                                                }else if(person.status == 'invisit'){
                                                    return (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                            {person.status}
                                                        </span> 
                                                    );
                                                }else if(person.status == 'completed'){
                                                    return (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {person.status}
                                                        </span> 
                                                    );
                                                }else{
                                                    return (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                            {person.status}
                                                        </span> 
                                                    );
                                                }
                                            })()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {(() => {
                                                if(person.status == 'pending'){
                                                    return (<div className="flex gap-2">
                                                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition" onClick={() => {handleInvisit(person._id)}}>Invisit</button>
                                                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition" onClick={() => {handleReject(person._id)}}>Rejected</button>
                                                    </div>)
                                                }else if(person.status == 'invisit'){
                                                    return (<div className="flex gap-2">
                                                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition" onClick={() => {handleComplete(person._id)}}>Completed</button>
                                                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition" onClick={() => {handleUndo(person._id)}}>Undo</button>
                                                    </div>)
                                                }else if(person.status == 'completed'){
                                                    return <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition" onClick={() => {handleUndo(person._id)}}>Undo</button>
                                                }else{
                                                    return <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition" onClick={() => {handleUndo(person._id)}}>Undo</button>
                                                }
                                            })()}
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
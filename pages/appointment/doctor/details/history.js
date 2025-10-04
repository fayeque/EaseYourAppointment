
import axios from "axios";
import  Router  from "next/router";
import { useContext, useEffect, useState } from "react"
import {StateContext}  from "../../../_app";
import moment from "moment";
import Link from "next/link";

export default function Dashboard(){
    const stateContext = useContext(StateContext);
    const [appn,setAppn] = useState([]);
    useEffect(() => {
        async function getData(){
          const config={
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials: true
        }
            try{
                var {data} = await axios.get("/api/appointment/doctor/history",config);
                setAppn(data);
            }catch(error){
                stateContext.dispatch({
                    type:'unauthenticate',
                    payload:null
                });
                stateContext.dispatch({
                    type:'setErrors',
                    payload:[{message:"Please login first"}]
                });
                setTimeout(() => {
                  stateContext.dispatch({
                    type:'removeErrors',
                    payload:null
                  })
                },2000)
                Router.push("/auth/doctorSignin");
            }
        }
        getData();
    },[]);

    const formatDate = (d) => {
        return new Date(d);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-4 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 7v-7" /></svg>
                        Appointment History
                    </h1>
                    <p className="text-gray-600 text-base">View your past appointment schedules</p>
                </div>

                {/* Appointments Table Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Past Appointments
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Day & Timing</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total & Pending</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {appn.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="text-center py-8 text-gray-400 text-lg">No appointment history</td>
                                    </tr>
                                )}
                                {appn.map((person, i) => (
                                    <tr key={i} className="hover:bg-indigo-50 transition duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                                </div>
                                                <div className="text-sm text-gray-700 font-medium">{moment(person.date).format('MM/DD/YYYY')}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-900">{person.day}</div>
                                            <div className="text-xs text-gray-500">{person.time}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">Total: <span className="font-bold">{person.total}</span></div>
                                            <div className="text-xs text-yellow-600">Pending: <span className="font-bold">{person.pending}</span></div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href="/appointment/doctor/details/[id]" as={`/appointment/doctor/details/${person._id}`}>
                                                <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                    View details
                                                </a>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

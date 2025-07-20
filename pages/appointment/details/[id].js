import axios from "../../../utils/axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import useSWR from "swr";
import { StateContext } from "../../_app";
import moment from "moment";

const fetcher = async (url) => {
    console.log("appnId in fetcher",url)
    var {data} = await axios.get(url);
    console.log("daataaa",data)
    return data;
}

export default function Details(){
    const router = useRouter();
    const stateContext = useContext(StateContext);
    
    var appnId = router.query.id;
    console.log("appniD",appnId);

    const {data,error} = useSWR(`/api/appointment/patient/${appnId}`,fetcher);

    if(error){
        Router.push("/");
        console.log("Flashing error...");
    }

    if(!data){
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading appointment details...</p>
                </div>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending':
                return { bg: 'bg-orange-100', text: 'text-orange-800', icon: '⏳' };
            case 'invisit':
                return { bg: 'bg-blue-100', text: 'text-blue-800', icon: '👨‍⚕️' };
            case 'completed':
                return { bg: 'bg-green-100', text: 'text-green-800', icon: '✅' };
            default:
                return { bg: 'bg-red-100', text: 'text-red-800', icon: '❌' };
        }
    };

    const getStatusText = (status) => {
        switch(status) {
            case 'pending':
                return 'Waiting';
            case 'invisit':
                return 'In Progress';
            case 'completed':
                return 'Completed';
            default:
                return 'Cancelled';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Appointment Queue Details
                    </h1>
                    <p className="text-lg text-gray-600">
                        Real-time status of all patients in today&apos;s queue
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                                <p className="text-2xl font-bold text-gray-900">{data.total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">{data.completed}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">{data.pending}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Current</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {data.currentVisiting == -1 ? 'Waiting' : data.currentVisiting}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Visits */}
                {data.trackVisited && data.trackVisited.length > 0 && (
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Recent Visits
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {data.trackVisited.map((visit, index) => (
                                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    #{visit}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Patients Queue Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                        <h3 className="text-xl font-semibold text-white">Patient Queue</h3>
                        <p className="text-blue-100 text-sm">Current status of all patients in the queue</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Queue No.
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Patient Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Mobile Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.appointments.map((person, i) => {
                                    const statusConfig = getStatusColor(person.status);
                                    const isCurrentUser = person.patientId == stateContext.count.currentUser?.id;
                                    
                                    return (
                                        <tr 
                                            key={i} 
                                            className={`hover:bg-gray-50 transition duration-200 ${
                                                isCurrentUser ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                                            }`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                        <span className="text-sm font-medium text-gray-900">{i + 1}</span>
                                                    </div>
                                                    {isCurrentUser && (
                                                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            You
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{person.mobile}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                                                    <span className="mr-1">{statusConfig.icon}</span>
                                                    {getStatusText(person.status)}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Status Legend</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mr-3">
                                ⏳ Waiting
                            </span>
                            <span className="text-sm text-gray-600">Patient is waiting</span>
                        </div>
                        <div className="flex items-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-3">
                                👨‍⚕️ In Progress
                            </span>
                            <span className="text-sm text-gray-600">Currently with doctor</span>
                        </div>
                        <div className="flex items-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-3">
                                ✅ Completed
                            </span>
                            <span className="text-sm text-gray-600">Appointment finished</span>
                        </div>
                        <div className="flex items-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-3">
                                ❌ Cancelled
                            </span>
                            <span className="text-sm text-gray-600">Appointment cancelled</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}




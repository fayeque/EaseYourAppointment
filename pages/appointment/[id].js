import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../_app';
import { useRouter } from 'next/router'
import axios from '../../utils/axios';
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
                const userDetail = JSON.parse(localStorage.getItem('currentUser'))?.jwtToken ;

                if(!userDetail){
                  showErrorAlert(stateContext.dispatch,'setErrors',[{message:'Please login first'}]);
                  Router.push("/");
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Book Your Appointment
                    </h1>
                    <p className="text-lg text-gray-600">
                        Schedule your visit with our healthcare professional
                    </p>
                </div>

                {/* Doctor Info Card */}
                {doctor && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
                                <p className="text-blue-600 font-medium">{doctor.speciality}</p>
                                <div className="flex items-center mt-2">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L2.98 8.483c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.049 2.927z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm text-gray-600">5.0 (120 reviews)</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Chamber Information */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {doctor.chambers.map((chamber, i) => (
                                <div key={i} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <p className="font-medium text-gray-900 mb-1">Chamber {i + 1}</p>
                                            <p className="text-sm text-gray-600 mb-2">{chamber.address}</p>
                                            <div className="text-xs text-gray-500 space-y-1">
                                                <p>🕒 {chamber.timing}</p>
                                                <p>📅 {chamber.weekdays.join(', ')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Appointment Form */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                        <h3 className="text-xl font-semibold text-white">Patient Information</h3>
                        <p className="text-blue-100 text-sm">Please fill in your details to book the appointment</p>
                    </div>
                    
                    <form onSubmit={onSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Patient Name */}
                            <div className="md:col-span-2">
                                <label htmlFor="pname" className="block text-sm font-medium text-gray-700 mb-2">
                                    Patient Name *
                                </label>
                                <input
                                    type="text"
                                    name="pname"
                                    id="pname"
                                    required
                                    autoComplete="given-name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    placeholder="Enter patient's full name"
                                />
                            </div>

                            {/* Patient Address */}
                            <div className="md:col-span-2">
                                <label htmlFor="paddress" className="block text-sm font-medium text-gray-700 mb-2">
                                    Patient Address *
                                </label>
                                <input
                                    type="text"
                                    name="paddress"
                                    id="paddress"
                                    required
                                    autoComplete="street-address"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    placeholder="Enter patient's address"
                                />
                            </div>

                            {/* Mobile Number */}
                            <div className="md:col-span-2">
                                <label htmlFor="pmnumber" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile Number *
                                </label>
                                <input
                                    type="tel"
                                    name="pmnumber"
                                    id="pmnumber"
                                    required
                                    autoComplete="tel"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    placeholder="Enter mobile number"
                                />
                            </div>

                            {/* Date of Booking */}
                            <div className="md:col-span-2">
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Preferred Date *
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    required
                                    autoComplete="date"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                />
                            </div>

                            {/* Timing Selection */}
                            <div className="md:col-span-2">
                                <label htmlFor="timing" className="block text-sm font-medium text-gray-700 mb-2">
                                    Preferred Time *
                                </label>
                                <select
                                    required 
                                    name='timing'
                                    onChange={(e) => setSelectedOption(e.target.value)} 
                                    value={selectedOption}
                                    id="timing"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
                                >
                                    <option value="">-- Select a time --</option>
                                    {doctor && doctor.chambers.map((chamber, i) => (
                                        <option key={i} value={chamber.timing}>
                                            {chamber.timing} ({chamber.weekdays.join(', ')})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105 shadow-lg"
                            >
                                Book Appointment
                            </button>
                        </div>
                    </form>
                </div>

                {/* Additional Info */}
                <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-900 mb-2">Important Information</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Please arrive 10 minutes before your scheduled appointment</li>
                                <li>• Bring any relevant medical reports or prescriptions</li>
                                <li>• You will receive a confirmation SMS after booking</li>
                                <li>• Cancellations can be made up to 24 hours before the appointment</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
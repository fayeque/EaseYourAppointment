import { useContext,useState} from "react";
import { StateContext } from "../_app";
import Router from 'next/router';
import useCustomRequest from "../../hooks/useCustomRequest";
import Link from "next/link";
import { login } from "../../utils/auth";
import { LockClosedIcon } from '@heroicons/react/solid';
import axios from "../../utils/axios";

export default function DoctorSignin(){
    var stateContext=useContext(StateContext);
    console.log("In signin form",stateContext);
    const  [formData,setformData] = useState({
        mobile:"",
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
      
    const {mobile,password} = formData;
    
    const onChange=e => setformData({...formData,[e.target.name]:e.target.value});

    const login = async (mobile,password) => {
        const body = JSON.stringify({mobile,password});
        await doRequest(body);    
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        login(mobile,password);
    }
    
    if(typeof window !== 'undefined' && stateContext.count.currentUser && stateContext.count.currentUser.userRole == 0){
        Router.push("/");
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Card Container */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 text-center">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white">Welcome Back, Doctor</h2>
                        <p className="text-green-100 text-sm mt-2">Sign in to your professional dashboard</p>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-8">
                        <form className="space-y-6" onSubmit={onSubmit}>
                            {/* Mobile Input */}
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile Number
                                </label>
                                <input
                                    value={mobile} 
                                    onChange={(e) => onChange(e)}
                                    id="mobile"
                                    name="mobile"
                                    type="text"
                                    autoComplete="tel"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                                    placeholder="Enter your mobile number"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                                    placeholder="Enter your password"
                                />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-green-600 hover:text-green-500 transition duration-200">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <LockClosedIcon className="h-5 w-5 text-green-500 group-hover:text-green-400" aria-hidden="true" />
                                    </span>
                                    Sign in to your dashboard
                                </button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">New to our platform?</span>
                                </div>
                            </div>
                        </div>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                            <Link href="/auth/doctorSignup">
                                <a className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-green-600 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Register as a Doctor
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center">
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Benefits</h3>
                        <div className="grid grid-cols-1 gap-3 text-sm text-gray-600">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Manage patient appointments
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Track patient history
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Professional dashboard
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
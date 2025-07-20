import { useContext, useState } from "react";
import { StateContext } from "../_app";
import Router from 'next/router';
import Link from "next/link";
import axios from "../../utils/axios";
import { LockClosedIcon } from '@heroicons/react/solid';
import Input from "../../components/input";
import { useForm } from "../../hooks/useForm";

function PatientSignup() {
    var stateContext = useContext(StateContext);
    const [formState, inputHandler] = useForm({
        mobile: "",
        password: ""
    });

    const signup = async (mobile, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ mobile, password });
        try {
            const response = await axios.post("/api/users/patient/signup", body, config);
            stateContext.dispatch({
                type: 'authenticate',
                payload: response.data
            });
            Router.push("/");
        } catch (err) {
            const errors = err.response?.data?.errors;
            if (errors) {
                stateContext.dispatch({
                    type: 'setErrors',
                    payload: errors
                });
                setTimeout(() => {
                    stateContext.dispatch({
                        type: 'removeErrors',
                        payload: null
                    });
                }, 2000);
            }
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        signup(formState.mobile, formState.password);
    };

    if (typeof window !== 'undefined' && stateContext.count.currentUser) {
        Router.push("/");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Card Container */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-center">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
                        <p className="text-blue-100 text-sm mt-2">Sign up as a patient to book appointments</p>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-8">
                        <form className="space-y-6" onSubmit={onSubmit}>
                            {/* Mobile Input */}
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <Input
                                        type="text"
                                        name="mobile"
                                        id="mobile"
                                        placeholder="Enter your mobile number"
                                        minLength="5"
                                        onInput={inputHandler}
                                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Enter your password"
                                        minLength="6"
                                        onInput={inputHandler}
                                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
                                    </span>
                                    Sign up
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
                                    <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                                </div>
                            </div>
                        </div>

                        {/* Sign In Link */}
                        <div className="mt-6 text-center">
                            <Link href="/auth/patientSignin">
                                <a className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Sign in to your account
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center">
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Why choose us?</h3>
                        <div className="grid grid-cols-1 gap-3 text-sm text-gray-600">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Easy appointment booking
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Real-time queue updates
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Secure and private
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientSignup;
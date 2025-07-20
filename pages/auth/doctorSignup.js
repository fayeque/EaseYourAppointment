import { useContext,useState} from "react";
import { StateContext } from "../_app";
import Router from 'next/router';
import Link from "next/link";
import { login } from "../../utils/auth";
import { LockClosedIcon } from '@heroicons/react/solid';
import axios from "../../utils/axios";
import Chamber from "../../components/chamber";

export default function DoctorSignup(){
    var stateContext=useContext(StateContext);
    console.log("In signin form",stateContext);
    const  [formData,setformData] = useState({
        mobile:"",
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
    
    const {mobile,name,password,passcode,speciality} = formData;
    
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
            index:null
        }])
    }

    const removeChamberInParent = (i) => {
        chambers.splice(i,1);
        setChambers([...chambers]);
    }
    
    console.log("total cahmbers",chambers);
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Join Our Medical Network
                    </h1>
                    <p className="text-lg text-gray-600">
                        Register as a healthcare professional and start managing your practice
                    </p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 text-center">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white">Doctor Registration</h2>
                        <p className="text-green-100 text-sm mt-2">Create your professional account</p>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-8">
                        <form className="space-y-6" onSubmit={onSubmit}>
                            {/* Personal Information Section */}
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Personal Information
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            value={name} 
                                            onChange={(e) => onChange(e)}
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    {/* Mobile */}
                                    <div>
                                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                                            Mobile Number *
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

                                    {/* Speciality */}
                                    <div>
                                        <label htmlFor="speciality" className="block text-sm font-medium text-gray-700 mb-2">
                                            Medical Speciality *
                                        </label>
                                        <input
                                            value={speciality} 
                                            onChange={(e) => onChange(e)}
                                            id="speciality"
                                            name="speciality"
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                                            placeholder="e.g., Cardiology, Pediatrics"
                                        />
                                    </div>

                                    {/* Passcode */}
                                    <div>
                                        <label htmlFor="passcode" className="block text-sm font-medium text-gray-700 mb-2">
                                            Professional Passcode *
                                        </label>
                                        <input
                                            value={passcode} 
                                            onChange={(e) => onChange(e)}
                                            id="passcode"
                                            name="passcode"
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                                            placeholder="Enter your passcode"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Security Section */}
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Security
                                </h3>
                                
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password *
                                    </label>
                                    <input
                                        value={password} 
                                        onChange={(e) => onChange(e)}
                                        minLength="6"
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                                        placeholder="Create a strong password"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Minimum 6 characters required</p>
                                </div>
                            </div>

                            {/* Chambers Section */}
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        Practice Chambers
                                    </h3>
                                    <button 
                                        type="button"
                                        onClick={addChamber}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add Chamber
                                    </button>
                                </div>
                                
                                <div className="space-y-4">
                                    {chambers.map((chamber,i) => (
                                        <Chamber 
                                            key={i} 
                                            c={chamber} 
                                            setChamberInParent={setChamberInParent} 
                                            removeChamberInParent={removeChamberInParent} 
                                            index={i} 
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-8 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Create Professional Account
                                </button>
                            </div>
                        </form>

                        {/* Sign In Link */}
                        <div className="mt-8 text-center pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link href="/auth/doctorSignin">
                                    <a className="font-medium text-green-600 hover:text-green-500 transition duration-200">
                                        Sign in here
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Management</h3>
                        <p className="text-sm text-gray-600">Manage appointments and patient records efficiently</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Updates</h3>
                        <p className="text-sm text-gray-600">Get instant notifications and queue updates</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Platform</h3>
                        <p className="text-sm text-gray-600">HIPAA compliant and secure data handling</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
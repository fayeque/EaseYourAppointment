import Link from 'next/link';
import Router from 'next/router';
import { useContext, useState } from 'react';
import { StateContext } from '../pages/_app';
import Cookies from 'js-cookie';
import axios from '../utils/axios';

export default function Header({ currentUser }){
  var stateContext = useContext(StateContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    !stateContext.count.currentUser && { label: 'Doctor Signin', href: '/auth/doctorSignin' },
    !stateContext.count.currentUser && { label: 'Patient Signin', href: '/auth/patientSignin' },
    stateContext.count.currentUser && stateContext.count.currentUser.userRole == 0 && { label: 'My appointments', href: '/patient/appointments' },
    stateContext.count.currentUser && stateContext.count.currentUser.userRole == 1 && { label: 'History', href: '/appointment/doctor/details/history' }
  ]

  const handleClick = async () => {
    const config={
      headers:{
          'Content-Type':'application/json'
      },
      withCredentials: true
    }
    var {data} = await axios.get("/api/users/signout",config);
    stateContext.dispatch({
      type:'unauthenticate',
      payload:null
    });
    Router.push("/");
  }

  const showHeader = () => {
    if(stateContext.count.currentUser && stateContext.count.currentUser.userRole == 0){
      return (
        <Link href="/">
          <a className='flex items-center space-x-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition duration-200'>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span>Ease Your Appointment</span>
          </a>
        </Link>
      )
    }else if(stateContext.count.currentUser && stateContext.count.currentUser.userRole == 1){
      return (
        <Link href="/doctor/dashboard">
          <a className='flex items-center space-x-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition duration-200'>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span>Ease Your Appointment</span>
          </a>
        </Link>
      )
    }else{
      return (
        <Link href="/">
          <a className='flex items-center space-x-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition duration-200'>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span>Ease Your Appointment</span>
          </a>
        </Link>
      )
    }
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {showHeader()}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.filter((linkConfig) => linkConfig)
                .map(({ label, href }) => {
                  return (
                    <Link key={href} href={href}>
                      <a className='px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition duration-200'>
                        {label}
                      </a>
                    </Link>
                  );
                })}
              
              {stateContext.count.currentUser && (
                <div className="flex items-center space-x-4">
                  {/* User Info */}
                  <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-blue-700">
                      {stateContext.count.currentUser.userRole === 0 ? 'Patient' : 'Doctor'}
                    </span>
                  </div>
                  
                  {/* Logout Button */}
                  <button 
                    onClick={handleClick}
                    className='px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 flex items-center space-x-2'
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {links.filter((linkConfig) => linkConfig)
              .map(({ label, href }) => {
                return (
                  <Link key={href} href={href}>
                    <a className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition duration-200'>
                      {label}
                    </a>
                  </Link>
                );
              })}
            
            {stateContext.count.currentUser && (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded-lg mb-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-blue-700">
                    {stateContext.count.currentUser.userRole === 0 ? 'Patient' : 'Doctor'}
                  </span>
                </div>
                
                <button 
                  onClick={handleClick}
                  className='w-full px-3 py-2 rounded-md text-base font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center space-x-2'
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
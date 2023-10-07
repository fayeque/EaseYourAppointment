import Link from 'next/link';
import Router from 'next/router';
import { useContext } from 'react';
import { StateContext } from '../pages/_app';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Header({ currentUser }){
  var stateContext = useContext(StateContext);
  const links = [
    !stateContext.count.currentUser && { label: 'Doctor Signin', href: '/auth/doctorSignin' },
    !stateContext.count.currentUser && { label: 'Patient Signin', href: '/auth/patientSignin' },
    stateContext.count.currentUser && stateContext.count.currentUser.userRole == 0 && { label: 'My appointments', href: '/patient/appointments' },
    stateContext.count.currentUser && stateContext.count.currentUser.userRole == 1 && { label: 'History', href: '/appointment/doctor/details/history' }
    // stateContext.count.currentUser && { label: 'Logout', href: '/logout'}
  ]
    // .filter((linkConfig) => linkConfig)
    // .map(({ label, href }) => {
    //   return (
    //     <li key={href} className="nav-item">
    //       <Link href={href}>
    //         <a className="nav-link">{label}</a>
    //       </Link>
    //     </li>
    //   );
    // });

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
        <a className='block px-3 py-2 rounded-md bg-gray-50'>AMS</a>
        </Link>
        )
      }else if(stateContext.count.currentUser && stateContext.count.currentUser.userRole == 1){
        return (
          <Link href="/doctor/dashboard">
          <a className='block px-3 py-2 rounded-md bg-gray-50'>AMS</a>
          </Link>
          )
      }else{
        return (
          <Link href="/">
          <a className='block px-3 py-2 rounded-md bg-gray-50'>AMS</a>
          </Link>
          )
      }
    }

  return (
    // <nav className="navbar navbar-light bg-light">
      
    //   {showHeader()}
     

    //   <div className="d-flex justify-content-end">
    //     <ul className="nav d-flex align-items-center">{links}</ul>
    //   </div>
    //   {stateContext.count.currentUser ? <button onClick={handleClick}>Logout</button> : ""}
    // </nav>
    <nav className="py-4 px-6 text-sm font-medium">
      <ul className="flex space-x-3">
        {showHeader()}
        {links.filter((linkConfig) => linkConfig)
        .map(({ label, href }) => {
        return (
        <li key={href}>
          <Link href={href}>
            <a className='block px-3 py-2 rounded-md bg-gray-50'>{label}</a>
          </Link>
        </li>
      );
    })}
    {stateContext.count.currentUser ? <button className='block px-3 py-2 rounded-md bg-gray-50' onClick={handleClick}>Logout</button> : ""}
    
      </ul>
    </nav>
  );
};
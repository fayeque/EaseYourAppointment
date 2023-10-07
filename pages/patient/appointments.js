import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../_app";
import useSWR from 'swr';
import moment from "moment";


export default function Appointments(){
    const [appns,setAppns] = useState([]);

    const stateContext = useContext(StateContext);
    
    useEffect(() => {
        const getAppns = async () => {
            try{
              const config={
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials: true
            }
            const res = await axios.get("/api/patientappn/appointments",config);
            const appns =  res.data;
            console.log({appns});
            setAppns(appns);
            }catch(err){
                console.log(err.response.status);
                const errors=err.response.data.errors;
                console.log(errors);
                if(errors){
                    // errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
                    stateContext.dispatch({
                      type:'setErrors',
                      payload:errors
                    });

                    stateContext.dispatch({
                        type:'unauthenticate',
                        payload:null
                    })
      
                    setTimeout(() => {
                      stateContext.dispatch({
                        type:'removeErrors',
                        payload:null
                      })
                    },2000);
                    Router.push("/auth/patientSignin");
                }
            }
        }
        getAppns();
    },[]);


    return (

        <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Day & Timing
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Doctor Name
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appns.map((person,i) => (
                    <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                          <div className="text-sm text-gray-500">{person.patientName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                          <div className="text-sm text-gray-500">{moment(person.date).format('DD/MM/YYYY')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      {/* <div className="text-sm font-medium text-gray-900">{person.da}</div> */}
                            <div className="text-sm text-gray-500">{person.timing}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{person.number}</div>
                       
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{person.doctorName}</div>
                       
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href="/appointment/details/[id]" as={`/appointment/details/${person.appointmentId}`}>
                              <a className="text-indigo-600 hover:text-indigo-900">View details</a>
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

        // <div>
        //     {appns.map((appn,i) => {
        //         return (
        //             <div key={i}>
        //                 {appn.patientName}
        //                 <Link href="/appointment/details/[id]" as={`/appointment/details/${appn.appointmentId}`}>
        //                     <a>View details</a>
        //                 </Link>
        //             </div>
        //         )
        //     })}
        // </div>
    )
}
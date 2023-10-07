
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
                console.log(data);
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
                Router.push("/auth/doctorSignin");
            }

        }
        getData();
    },[]);

    const formatDate = (d) => {
        return new Date(d);
    }

    // const showAppn = () => {
    //     var formattedDate;
    //     appn.map((a) => {
    //         formattedDate = moment(a.date).format('MM/DD/YYYY');
    //         return (
    //             <div key={i}>
    //             <p>{a.day} - {formattedDate} - {a.time}</p>
    //             <p>{a.total} - {a.pending} - {a.completed}</p>
    //              </div>
    //         )
    //     })
    // }

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
                      Total & pending
                    </th>
  
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appn.map((person,i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                          <div className="text-sm text-gray-500">{moment(person.date).format('MM/DD/YYYY')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{person.day}</div>
                            <div className="text-sm text-gray-500">{person.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Total : {person.total}</div>
                        <div className="text-sm text-gray-500">Pending : {person.pending}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href="/appointment/doctor/details/[id]" as={`/appointment/doctor/details/${person._id}`}>
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
    )
}

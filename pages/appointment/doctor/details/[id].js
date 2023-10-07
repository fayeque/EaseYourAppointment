import { useRouter } from "next/router";
import useSWR,{ useSWRConfig } from "swr";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

const fetcher = async (url) => {
    // const res = await fetch(`http://localhost:3000${url}`,{
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //       withCredentials: true
    // });
    try{
    const config={
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials: true
    }
    var {data}=await axios.get(url,config);
        console.log("response is here in details " , data);
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    return data;
}catch(err){
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = data;
    error.status = data.status;
    throw error
}
  
    
  }
    // try{
    // console.log("appnId in fetcher",url)
    // var {data} = await axios.get(url);
    // console.log("daataaa",data);
    // return data;
    // }catch(err){
    // //     console.log(err.response);
    //     const error = new Error('An error occurred while fetching the data.')
    // // // Attach extra info to the error object.
    // // error.info = await res.json()
    //     error.status = 400;
    // }
// }

export default function DoctorAppnDetails(){
    const { mutate } = useSWRConfig()
    const router = useRouter();
    
    var appnId = router.query.id;
    console.log("appniD",appnId);
    const [appn,setAppn] = useState(true);

    console.log("rerenders");


    const {data,error} = useSWR(`/api/appointment/doctor/${appnId}`,fetcher);
    console.log("error in swr hook",error);

    if(!data){
        if(error && error.status == 401){
            return  (
                <div>
                    <p>Please login first</p>
                    <Link href="/auth/doctorSignin">Signin</Link>
                </div>
                )
        } 
        return <p>Loading...</p>
    }

    // if(error){
    //     return (
    //     <div>
    //         <p>Please login first</p>
    //         <Link href="/auth/doctorSignin">Signin</Link>
    //     </div>
    //     )
    // }

    const handleComplete = async (uniqueId) => {
        try{
        var {data} = await axios.get(`/api/appointment/completed/${appnId}/${uniqueId}`);
        mutate(`/api/appointment/doctor/${appnId}`);
        }catch(err){
            console.log(err);
        }

    }

    const handleUndo = async (uniqueId) => {
        try{
           
            var {data} = await axios.get(`/api/appointment/undo/${appnId}/${uniqueId}`);
            mutate(`/api/appointment/doctor/${appnId}`);
            }catch(err){
                console.log(err);
            }
    }

    const handleInvisit = async (uniqueId) => {
        try{
           
            var {data} = await axios.get(`/api/appointment/invisit/${appnId}/${uniqueId}`);
            mutate(`/api/appointment/doctor/${appnId}`);
            }catch(err){
                console.log(err);
            }
    }

    const handleReject = async (uniqueId) => {
        try{
           
            var {data} = await axios.get(`/api/appointment/rejected/${appnId}/${uniqueId}`);
            mutate(`/api/appointment/doctor/${appnId}`);
            }catch(err){
                console.log(err);
            }
    }


    return (
        <div>
            <div style={{display:'flex'}}>
            <div className="text-sm font-small px-4 text-gray-800">Total-{data.total}</div>
            <div className="text-sm font-small px-4 text-gray-500">Completed - {data.completed}</div>
            <div className="text-sm font-small px-4 text-gray-500">Pending - {data.pending}</div>
            <div className="text-sm font-small px-4 text-gray-500">Current - {data.currentVisiting == -1 ? 'Waiting' : data.currentVisiting}</div> 
            </div>
        
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
                    Mobile No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.appointments.map((person,i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-md font-medium text-gray-600">{i+1}. {person.name}</div>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"> */}
                    {(() => {
                                if(person.status == 'pending'){
                                    return (<div>
                                        <button className="text-indigo-600  hover:text-indigo-900" onClick={() => {handleInvisit(person._id)}}>Invisit</button>
                                        <button className="text-indigo-600  hover:text-indigo-900 px-6" onClick={() => {handleReject(person._id)}}>Rejected</button>
                                        </div>)
                                }else if(person.status == 'invisit'){
                                    return (<div>
                                        <button className="text-indigo-600  hover:text-indigo-900" onClick={() => {handleComplete(person._id)}}>Completed</button>
                                        <button className="text-indigo-600  hover:text-indigo-900 px-6" onClick={() => {handleUndo(person._id)}}>Undo</button>
                                    </div>)
                                }else if(person.status == 'completed'){
                                    return <button className="text-indigo-600  hover:text-indigo-900" onClick={() => {handleUndo(person._id)}}>Undo</button>
                                }else{
                                    return <button className="text-indigo-600  hover:text-indigo-900" onClick={() => {handleUndo(person._id)}}>Undo</button>
                                }
                            })()}
                    {/* </td> */}
                          {/* <div className="text-sm text-gray-500">{person.email}</div> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{person.mobile}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      
                      {(() => {
                                if(person.status == 'pending'){
                                    return (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                                            {person.status}
                                        </span> 
                                    );
                                }else if(person.status == 'invisit'){
                                    return (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {person.status}
                                        </span> 
                                    );
                                }else if(person.status == 'completed'){
                                    return (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {person.status}
                                        </span> 
                                    );
                                }else{
                                    return (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                            {person.status}
                                        </span> 
                                    );
                                }
                            })()}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>





                {/* {data.appointments.map((a,i) => {
                    return (
                        <div key={i}>
                            {(() => {
                                if(a.status == 'pending'){
                                    return (<p style={{color:'orange'}}> {a.name}  {a.mobile}  {a.status}</p>);
                                }else if(a.status == 'invisit'){
                                    return (<p style={{color:'blue'}}> {a.name}  {a.mobile}  {a.status}</p>);
                                }else if(a.status == 'completed'){
                                    return (<p style={{color:'green'}}> {a.name}  {a.mobile}  {a.status}</p>);
                                }else{
                                    return (<p style={{color:'red'}}> {a.name}  {a.mobile}  {a.status}</p>);
                                }
                            })()}
                            {(() => {
                                if(a.status == 'pending'){
                                    return (<div>
                                        <button onClick={() => {handleInvisit(a._id)}}>Invisit</button>
                                        <button onClick={() => {handleReject(a._id)}}>Rejected</button>
                                        </div>)
                                }else if(a.status == 'invisit'){
                                    return (<div>
                                        <button onClick={() => {handleComplete(a._id)}}>Completed</button>
                                        <button onClick={() => {handleUndo(a._id)}}>Undo</button>
                                    </div>)
                                }else if(a.status == 'completed'){
                                    return <button onClick={() => {handleUndo(a._id)}}>Undo</button>
                                }else{
                                    return <button onClick={() => {handleUndo(a._id)}}>Undo</button>
                                }
                            })()}

                        </div>
                    )
                })} */}
                
        </div>
    )
}
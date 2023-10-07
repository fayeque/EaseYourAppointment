import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import useSWR from "swr";
import { StateContext } from "../../_app";

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
    // const [appn,setAppn] = useState(null);

    const {data,error} = useSWR(`/api/appointment/patient/${appnId}`,fetcher);

    if(error){
        Router.push("/");
        console.log("Flashing error...");
    }

    // // console.log("data outside swr",data);

    if(!data){
        console.log("in not data")
        return "Loading...."
    }
 

    // const getAppns = async () => {
    //     try{
    //     var res= await axios.get(`/api/appointment/patient/${appnId}`);
    //     console.log(res.data);
    //     setAppn(res.data);
  
    //     }catch(err){
    //         console.log(err.response.status);
    //         const errors=err.response.data.errors;
    //         console.log(errors);
    //         if(errors){
    //             // errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
                // stateContext.dispatch({
                //   type:'setErrors',
                //   payload:errors
                // });

    //             stateContext.dispatch({
    //                 type:'unauthenticate',
    //                 payload:null
    //             })
  
    //             setTimeout(() => {
    //               stateContext.dispatch({
    //                 type:'removeErrors',
    //                 payload:null
    //               })
    //             },2000);
    //             Router.push("/auth/patientSignin");
    //         }
    //     };
    // }

    // useEffect(() => {
    //     if(appnId){
    //         getAppns();
    //     }
    // },[appnId]);

    // const showStatus = () => {
    //     return (
    //         <div>
    //             <p>Total:{data.total}</p>
    //             <p>Completed:{data.completed}</p>
    //             <p>Pending:{data.pending}</p>
    //             <p>Current visiting : {data.currentVisiting == -1 ? 'Waiting' : data.currentVisiting}</p>
    //             <p>Recent visits : {data.trackVisited.map((t,i) => {
    //                 return <div style={{display:'inline'}}>{t}, </div>
    //             })}
    //             </p>
    //             {data.appointments.map((a,i) => {
    //                 return (<div key={i}>
    //                         {(() => {
    //                             if(a.status == 'pending'){
    //                                 return (<p style={{color:'orange'}}> {a.name}  {a.mobile}  {a.status}</p>);
    //                             }else if(a.status == 'invisit'){
    //                                 return (<p style={{color:'blue'}}> {a.name}  {a.mobile}  {a.status}</p>);
    //                             }else if(a.status == 'completed'){
    //                                 return (<p style={{color:'green'}}> {a.name}  {a.mobile}  {a.status}</p>);
    //                             }else{
    //                                 return (<p style={{color:'red'}}> {a.name}  {a.mobile}  {a.status}</p>);
    //                             }
    //                         })()}
    //                 </div>)
    //             })}
    //         </div>
    //     )
    // }

   

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

              <tr className={person.patientId == stateContext.count.currentUser.id ? "bg-red-100" : ""} key={i}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-md font-medium text-gray-600">{i+1}. {person.name}</div>
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
</div>
    )

}




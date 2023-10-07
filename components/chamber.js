import { useState } from "react";
import { LockClosedIcon } from '@heroicons/react/solid';
export default function Chamber({c,setChamberInParent,removeChamberInParent,index}){
    const [chamber,setChamber] = useState({
        address:"",
        from:"",
        to:"",
        weekdays:null,
        index:index
    });


    var {address,from,to,index} = chamber;
    const [showChamber,setShowChamber] = useState(true);

    const removeButton = (e) => {
        removeChamberInParent(chamber.index);
    }

    const onChambersChange = (e) => {
        setChamber({...chamber,[e.target.name]:e.target.value})
      }
    //   console.log("chambers till now",chamber);
    const handleSubmit = (e) => {
        setChamberInParent(chamber);
        setShowChamber(false);
        console.log("chambers till now",chamber);
    }
    return(

        
        <div>
        {showChamber ?  
        <div>

        <label>Address</label>
        <input onChange={(e) => onChambersChange(e)}
          id="address"
          name="address"
          value={address}
          type="text"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Chamber Address"
        />
        <label>From</label>
        <input onChange={(e) => onChambersChange(e)}
          id="Time"
          name="from"
          value={from}
          type="time"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="From"
        />
        <label>To</label>
        <input onChange={(e) => onChambersChange(e)}
          id="Time"
          name="to"
          value={to}
          type="time"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="To"
        />
        <label>
          weekdays
        </label>
        <select
        required 
        name='weekdays'
        onChange={(e) => chamber.weekdays = Array.from(e.target.options).filter(option => option.selected).map(option => option.value)} 
        // value={selectedOption}
        id="country"
        autoComplete="country-name"
        multiple
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
                         <option value="Sun">Sunday</option>
                         <option value="Mon">Monday</option>
                         <option value="Tue">Tuesday</option>
                         <option value="Wed">Wednessday</option>
                         <option value="Thu">Thursday</option>
                         <option value="Fri">Friday</option>
                         <option value="Sat">Saturday</option>
        </select>
        <button onClick={handleSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Add chamber
              </button>
            {index == 0 ? "" :
          <button onClick={removeButton}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Remove chamber
              </button>
            } 
      </div>
      :
          <p>One chamber added <a onClick={(e) => setShowChamber(true)}>Edit</a></p>
}
       
      </div>

    )
}
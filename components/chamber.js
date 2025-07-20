import { useState } from "react";
import { LockClosedIcon } from '@heroicons/react/solid';
export default function Chamber({c,setChamberInParent,removeChamberInParent,index}){
    const [chamber,setChamber] = useState({
        address: c?.address || "",
        from: c?.from || "",
        to: c?.to || "",
        weekdays: c?.weekdays || [],
        index: index
    });

    var {address,from,to,weekdays} = chamber;
    const [showChamber,setShowChamber] = useState(true);

    const removeButton = (e) => {
        removeChamberInParent(chamber.index);
    }

    const onChambersChange = (e) => {
        setChamber({...chamber,[e.target.name]:e.target.value})
    }
    const handleWeekdaysChange = (e) => {
        const selected = Array.from(e.target.options).filter(option => option.selected).map(option => option.value);
        setChamber({...chamber, weekdays: selected});
    }
    const handleSubmit = (e) => {
        setChamberInParent(chamber);
        setShowChamber(false);
    }
    return(
        <div className="mb-6">
        {showChamber ?  
        <div className="bg-white rounded-xl shadow p-4 space-y-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input onChange={onChambersChange}
              id="address"
              name="address"
              value={address}
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-[#f5f7fa] focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900"
              placeholder="Chamber Address"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <input onChange={onChambersChange}
              id="from"
              name="from"
              value={from}
              type="time"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-[#f5f7fa] focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900"
              placeholder="From"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input onChange={onChambersChange}
              id="to"
              name="to"
              value={to}
              type="time"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-[#f5f7fa] focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900"
              placeholder="To"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">Weekdays</label>
            <select
                required 
                name='weekdays'
                multiple
                value={weekdays}
                onChange={handleWeekdaysChange}
                id="weekdays"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-[#f5f7fa] focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900"
            >
                <option value="Sun">Sunday</option>
                <option value="Mon">Monday</option>
                <option value="Tue">Tuesday</option>
                <option value="Wed">Wednesday</option>
                <option value="Thu">Thursday</option>
                <option value="Fri">Friday</option>
                <option value="Sat">Saturday</option>
            </select>
            <div className="flex gap-2 mt-4">
                <button onClick={handleSubmit}
                    className="flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add chamber
                </button>
                {index !== 0 && (
                    <button onClick={removeButton}
                        className="flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Remove
                    </button>
                )}
            </div>
        </div>
        :
        <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-indigo-700">Chamber {index + 1}</span>
                <div className="flex gap-2">
                    <button onClick={() => setShowChamber(true)} className="text-xs text-blue-600 hover:underline">Edit</button>
                    {index !== 0 && (
                        <button onClick={removeButton} className="text-xs text-red-500 hover:underline">Remove</button>
                    )}
                </div>
            </div>
            <div className="text-sm text-gray-700"><span className="font-medium">Address:</span> {address}</div>
            <div className="text-sm text-gray-700"><span className="font-medium">From:</span> {from} <span className="font-medium ml-2">To:</span> {to}</div>
            <div className="text-sm text-gray-700"><span className="font-medium">Weekdays:</span> {Array.isArray(weekdays) ? weekdays.join(', ') : weekdays}</div>
        </div>
        }
      </div>
    )
}
import { useContext } from "react";
import { StateContext } from "../pages/_app";

export default function Alert(){
    const stateContext = useContext(StateContext);

    if(stateContext.count && stateContext.count.errors && stateContext.count.errors.length > 0){
        return (
          <div>
          {stateContext.count.errors.map((err,i) => (
        <div key={i} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                     <strong className="font-bold">Oops!</strong>
              <span className="block sm:inline">{err.message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
         ))}
         </div>
        )
    }else if(stateContext.count && stateContext.count.success && stateContext.count.success.length > 0){
      return (
        <div>
          {stateContext.count.success.map((err,i) => (
            <div key={i} className="bg-indigo-900 text-center py-4 lg:px-4">
            <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
              <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">Success</span>
              <span className="font-semibold mr-2 text-left flex-auto">{err.message}</span>
              <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
            </div>
          </div>
          ))}
      </div>
    )
    }
    else{
        return "";
    }
}
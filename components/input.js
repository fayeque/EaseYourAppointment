import React from "react";



const Input = (props) => {

    // const [value,setValue] = useState("");

    const onChange = (e) => {
        console.log("name and value in input ", e.target.name,e.target.value);
         props.onInput(e.target.name,e.target.value);
    }

    return (
        <div>
        <label htmlFor={props.type} className="sr-only">
          {props.type}
        </label>
        <input
          onChange={(e) => onChange(e)}
          minLength={props.minLength}
          id={props.id}
          name={props.name}
          type={props.type}
          autoComplete="current-password"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder={props.placeholder}
        />
      </div>
    )

};


export default Input;
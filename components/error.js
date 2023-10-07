import Link from 'next/link';
import {useEffect, useState } from 'react';
import axios from 'axios';
var a=null;
console.log(a);

export function getError(){
    return a;
}

export default async function error (msg){
        var {data} = await axios.get("/api/users/currentUser");
        a=data;
        console.log("here in error",a);
        return a;

};
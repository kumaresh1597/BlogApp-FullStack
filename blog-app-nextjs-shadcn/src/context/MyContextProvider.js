"use client"
import React,{ useState } from "react";
import MyContext from "./Mycontext";

const MyContextProvider = (props)=>{

    const [category,setCategory] = useState("Trending");

    return (
        <MyContext.Provider value={{ category, setCategory }}>
          {props.children}
        </MyContext.Provider>
      );
}

export default MyContextProvider;

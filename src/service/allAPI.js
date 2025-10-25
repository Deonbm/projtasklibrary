import axios from "axios";
import commonapi from "./CommonAPI";
import serverurl from "./serverURL";


export const addprojects=async(body)=>{
 return await commonapi('post',`${serverurl}/addproject`,body)
}

export const getprojects=async()=>{
    return await commonapi('get',`${serverurl}/getproject`)
}


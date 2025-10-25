import axios from "axios";

const commonapi=async(http,url,body)=>{
 try {
    return await axios({
        method:http,
        url,
        data:body
    })
 } catch (error) {
    return error
 }
}

export default commonapi
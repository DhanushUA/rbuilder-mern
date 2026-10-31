import axios from "axios";



const axiosInstance = axios.create({
    baseURL:"https://rbuilder-server-mern.onrender.com",
    timeout:10000
})

//  global error handling

axiosInstance.interceptors.response.use((response)=>{
    console.log("API response received");
    return response
},
(error)=>{
    if(error.response){
        const status = error.response.status
        if(status == 401){
            console.log("Unauthorized access");
        }else if(status == 404){
            console.log("API or resource not found");
        }else if(status === 500){
             console.log("Server error")
        }else {
            console.log("HTTP Error",status);
        }
    }else if(error.resquest){
        console.log("no response from server")
    } else {
        console.log("error" ,error.message);
    }
    return Promise.reject(error)
   }
)
export default axiosInstance
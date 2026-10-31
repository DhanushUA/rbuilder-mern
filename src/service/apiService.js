import axiosService from "../api/axiosService";

//  save resume API: called by ResumeInput component when finish button clicks

 export const saveResumeApi = async (resumeDetails) => {
   return await axiosService("POST","/resumes",resumeDetails)
}


//  view resume API : called by view component when the page loads in browser
 export const viewResumeApi = async (resumeId) => {
    return await axiosService("GET",`/resumes/${resumeId}`,{})
}
// view resume API : called by saved   component when the page loads in browser
export const getAllResumeApi = async () => {
   return await axiosService("GET",`/resumes/`,{})
}
//view all saved resume : called when page loads in browser
export const deleteAllResumeApi = async (resumeId) => {
    return await axiosService("DELETE",`/resumes/${resumeId}`,{})
}

export const editAllResumeApi = async (resumeId,resumeDetails) => {
    return await axiosService("PUT",`/resumes/${resumeId}`,resumeDetails)
}

export const downloadResumeApi = async (resumeDetails) => {
    return await axiosService("POST",`/downloads`,resumeDetails)
}

export const getAlldownloadResumeApi = async () => {
    return await axiosService("GET",`/downloads`,{})
}

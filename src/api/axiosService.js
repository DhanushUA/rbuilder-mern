import axiosInstance from "./axiosinstance";

const axiosService = async (httpMethod, url, reqBody) => {
  try {

    const response = await axiosInstance({
      method: httpMethod,
      url,
      data: reqBody
    })
    return response
  } catch (error) {
    console.log("error occurred")
    throw error
  }
}

export default axiosService;
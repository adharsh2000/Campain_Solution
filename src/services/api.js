import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:4000/api"
  // baseURL: "http://89.117.109.159:4000/api"
  baseURL: "https://api.campaign.smartsolutionsme.com/",
});
// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // Modify the request config here (e.g., add headers, authentication tokens)
    const accessToken = JSON.parse(localStorage.getItem("token"));
    console.log("Inside interceptor");
    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    // Modify the response data here (e.g., parse, transform)

    return response;
  },
  (error) => {
    // Handle response errors here

    return Promise.reject(error);
  }
);

export default instance;

// export default axios.create({
//   baseURL: `http://localhost:4000/api/v1`,
//   // baseURL: `http://ec2-65-0-17-118.ap-south-1.compute.amazonaws.com/smartpos/api/v1`,
//   // baseURL: `http://192.168.29.103:4000/api/v1`,
//   // 'headers': { },
// });

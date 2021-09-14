/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import axios from "axios";
import URL from "../services/config";
import * as session from "../services/session";
import history from "../history";

/**Create a instance of axios with a custom config */
export const http = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "multipart/form-data",
  },
});

/**Add a request interceptor */
http.interceptors.request.use(
  function (config) {
    // var today = new Date();
    // var date =
    //   today.getFullYear() +
    //   "-" +
    //   (today.getMonth() + 1) +
    //   "-" +
    //   today.getDate();
    // if (date === "2021-07-27") {
    //   return false;
    // }
    const token = session.getSession();

    if (token) config.headers.Authorization = `Bearer ` + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**Add a response interceptor */
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      if (401 === error.response.status) {
        /**Add a 401 response interceptor*/
        session.clearSession();
        history.push("/");
      } else {
        return Promise.reject(error);
      }
    }
  }
);

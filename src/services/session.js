/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

const accessTokenKey = "userDetails";
const accessUserData = "accessUserData";
const accessUserToken = "accessUserToken";

const userKey = "user";
const userTypeKey = "userType";
const isAuthenticated = "isAuthenticated";

export const setSession = (accessToken) => {
  localStorage.setItem(accessTokenKey, accessToken);
};
export const setSessionData = (accessData) => {
  localStorage.setItem(accessUserData, accessData);
};
// export const setSessionData = (accessData) => {
//   sessionStorage.setItem(accessUserData, accessData);
// };

export const getSession = () => {
  return localStorage.getItem(accessTokenKey);
};
export const getSessionData = () => {
  return localStorage.getItem(accessUserData);
};

export const clearSessionData = () => {
  localStorage.removeItem(accessUserData);
};

export const clearSession = () => {
  localStorage.removeItem(accessTokenKey);
};

export const setUserSession = (accessUser, user) => {
  localStorage.setItem(accessUserToken, accessUser);
  localStorage.setItem(userKey, user);
};

export const setUser = (user) => {
  localStorage.setItem(userKey, user);
};

export const setUserType = (type) => {
  localStorage.setItem(userTypeKey, type);
};

export const setToken = (accessToken) => {
  localStorage.setItem(accessTokenKey, accessToken);
};

export const clearSessions = () => {
  localStorage.removeItem(accessTokenKey);
  localStorage.removeItem(userKey);
  localStorage.removeItem(isAuthenticated);
};

export const getSessionUserId = () => {
  let user = localStorage.getItem(userKey);
  user = JSON.parse(user);
  return user && user.id ? user.id : null;
};

export const getIsAuthenticated = () => {
  let isAuthenticated = false;
  if (localStorage.getItem("isAuthenticated")) {
    isAuthenticated = true;
  }
  return isAuthenticated;
};
export const setisAuthenticated = (state) => {
  localStorage.setItem(isAuthenticated, state);
};
export const checkSession = () => {
  return getSession().accessToken && getSession().user && getSession().userType
    ? true
    : false;
};

export const getUserType = () => {
  let user = localStorage.getItem(userTypeKey);
  return user;
};

export const getSessionToken = () => {
  let token;
  if (localStorage.getItem(accessTokenKey)) {
    token = localStorage.getItem(accessTokenKey);
  } else {
    token = localStorage.getItem(accessUserToken);
  }
  return token;
};
export const getSessions = () => {
  let accessToken;
  if (localStorage.getItem(accessTokenKey)) {
    accessToken = localStorage.getItem(accessTokenKey);
  } else {
    accessToken = localStorage.getItem(accessUserToken);
  }
  let userType = localStorage.getItem(userTypeKey);
  let user = JSON.parse(localStorage.getItem(userKey));
  return {
    accessToken,
    user,
    userType,
  };
};

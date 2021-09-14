import * as api from "./request";
import * as constant from "../services/apiUrl";

export const Login = async (state) => {
  return await api
    .PostReq(constant.Login, state)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const Register = async (state) => {
  return await api
    .PostReq(constant.Register, state)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const Social_Login = async (state) => {
  return await api
    .PostReq(constant.socialLogin, state)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const GetProfile = async () => {
  return await api
    .getReq(constant.getProfile)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const updateProfile = async (body) => {
  return await api
    .putReq(constant.updateUser, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const deleteProfile = async (id) => {
  return await api
    .delReq(constant.updateUser, id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const allUserInfos = async () => {
  return await api
    .getReq(constant.allUsers)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const GetUserInfos = async (id) => {
  return await api
    .getReq(constant.getSingleUser+id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const forGotPass = async (state) => {
  return await api
    .PostReq(constant.forgotPassword, state)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
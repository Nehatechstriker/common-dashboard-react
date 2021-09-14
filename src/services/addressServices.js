import * as api from "./request";
import * as constant from "../services/apiUrl";

export const addAddress = async (body) => {
  return await api
    .PostReq(constant.addAddress, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getAddress = async () => {
  return await api
    .getReq(constant.getAddress)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const deleteAddress = async (body) =>{
  return await api
    .delReq(constant.deleteAddress,body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
}

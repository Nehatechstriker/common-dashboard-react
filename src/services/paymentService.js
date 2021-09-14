import * as api from "./request";
import * as constant from "../services/apiUrl";

export const addCard = async (body) => {
  return await api
    .PostReq(constant.createCard, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getCard = async () => {
  return await api
    .getReq(constant.getCard)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const delCard = async (body) =>{
  return await api
    .delReq(constant.deleteCard,body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
}

export const createPay = async(body) =>{
  return await api
  .PostReq(constant.createPayment, body)
  .then((response) => {
    return response;
  })
  .catch((err) => {});
}

export const getInvoices = async () => {
  return await api
    .getReq(constant.getInvoices)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const createRazorPay = async(body) =>{
  return await api
  .PostReq(constant.createRazorpayment, body)
  .then((response) => {
    return response;
  })
  .catch((err) => {});
}
// /payment/razorpay/capture-payment/?razorpay_payment_link_id=fsdfsdfs2d1fs416&razorpay_payment_id=fds56fgsd56f5
import React, { useState, useEffect } from "react";
import * as paymentService from "../../../services/paymentService";
import { CInput, CLabel } from "@coreui/react";
import "./razorpay.css"
import { useHistory } from "react-router";
import { toast } from "react-toastify";
export default function Razorpay(props) {
  var randomNum = Math.floor(Math.random() * 10000);
 
  const history = useHistory();

  const [state, setState] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "order":
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;
      case "amount":
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      default:
        break;
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const payload = {
      order: randomNum,
      amount: state.amount,
      currency: "USD",
      shipping_address_id: props.location.state,
    };
    if(!payload.amount){
      return toast.error("Please enter amount")
    }
    if(!payload.shipping_address_id){
      return toast.error("Please select address!")
    }
    paymentService.createRazorPay(payload).then((res) => {
      let url = res.data.data.payment_url;
      window.open(url);
    });
  };
 
  return (
    <>
      <div className="container-payment">
        <div className="form-payment">
            <div className="modal-body d-block text-left">
              <div className="modalcontent">
                <form id="form">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group focused">
                        <CLabel className="form-control-label" htmlFor="order">
                          Order
                        </CLabel>
                        <CInput
                          value={randomNum}
                          id="order"
                          className="form-control form-control-alternative"
                          name="order"
                          type="text"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group focused">
                        <CLabel className="form-control-label" htmlFor="amount">
                          Amount
                        </CLabel>
                        <CInput
                          onChange={handleChange}
                          id="amount"
                          className="form-control form-control-alternative"
                          placeholder="Enter your amount"
                          name="amount"
                          type="text"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group focused">
                        <CLabel
                          className="form-control-label"
                          htmlFor="currency"
                        >
                          Currency
                        </CLabel>
                        <CInput
                          onChange={handleChange}
                          id="currency"
                          className="form-control form-control-alternative"
                          value="USD"
                          name="currency"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row float-right mt-4">
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary ml-3"
                        onClick={(e) => onSubmitForm(e)}
                      >
                        Submit
                      </button>
                    </div>
                    {/* </div> */}
                  </div>
                </form>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

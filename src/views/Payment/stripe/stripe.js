import React, { useState, useEffect } from "react";
import "./stripe.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import useForm from "../../useForm";
import * as paymentService from "../../../services/paymentService";
import Loader from "react-loader-spinner";
import showNotification from "services/notificationService";
import { CInput, CLabel } from "@coreui/react";
import Modal from "../../Modal/modal";
export default function Stripe(props) {
  const initialState = {
    name: { value: "", error: "" },
    card_number: { value: "", error: "" },
    exp_month: { value: "", error: "" },
    exp_year: { value: "", error: "" },
    cvv: { value: "", error: "" },
  };
  const history = useHistory();
  const [cardShow, setCardShow] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [new_Pay, setNew_Pay] = useState(false);
  const [cardId, setCardId] = useState();
  const [details, setDetails] = useState({
    order: "",
    amount: "",
    currency: "",
  });
  console.log(props.location.state, "props");
  let token = localStorage.getItem("userDetails");

  useEffect(() => {
    handleGetData();
  }, []);
  const stateValidatorSchema = {
    name: {
      required: true,
      validator: {
        func: (value) => /^[a-z][a-z\s]*$/.test(value),
        error: "Invalid first name format.",
      },
    },
    card_number: {
      required: true,
      validator: {
        func: (value) =>
          /^(?:3[47][0-9]{13})$/.test(value) ||
          /^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(value) ||
          /^(?:5[1-5][0-9]{14})$/.test(value) ||
          /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/.test(value),
        error: "Not a valid Card number!",
      },
    },
    cvv: {
      required: true,
      validator: {
        func: (value) => /^[0-9]{1,3}$/.test(value),
        error: "Invalid cvv number.",
      },
    },
    exp_month: {
      require: true,
      validator: {
        func: (value) => /^[0-9]{2}$/.test(value),
        error: "Enter a valid Month",
      },
    },
    exp_year: {
      require: true,
      validator: {
        func: (value) => /^[0-9]{4}$/.test(value),
        error: "Enter a valid Year",
      },
    },
  };
  const onSubmitForm = (state) => {
    const payload = {
      card_number: Number(state.card_number),
      exp_month: Number(state.exp_month),
      exp_year: Number(state.exp_year),
      cvv: Number(state.cvv),
    };
    paymentService
      .addCard(payload)
      .then((res) => {
        if (res.status === 200) {
          showNotification("success", res.data.message);
          handleGetData();
          document.getElementById("form").reset();
          history.push({ pathname: "/admin/payment" });
          setCardShow(false);
          setData(initialState);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          for (let i of err.response.data.message) {
            toast.error(`${i.error}`);
          }
        }
      });
  };

  const onHide = () => {
    setShow(false);
    setNew_Pay(false);
    document.getElementById("form").reset();
  };
  const { values, errors, dirty, handleChange, handleSubmit, disable } =
    useForm(initialState, stateValidatorSchema, onSubmitForm);
  const handleGetData = () => {
    paymentService
      .getCard()
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => toast.error(err));
  };
  const handleButton = () => {
    setCardShow(true);
  };
  const handleClose = () => {
    setCardShow(false);
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  const onPayShow = (id) => {
    setCardId(id);
    setNew_Pay(true);
  };

  const confirmDelete = (id) => {
    paymentService
      .delCard({ data: { id: id } })
      .then((resp) => {
        handleGetData();
      })
      .catch((err) => toast.error(err));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let Payload = {
      order: details.order,
      card: cardId,
      amount: details.amount,
      currency: "USD",
      shipping_address_id: props.location.state,
    };
    if(!Payload.shipping_address_id){
      return toast.error("You need to select address!")
    }
    paymentService.createPay(Payload).then((resp) => {
      toast.success(resp.data.message);
      handleGetData();
      setNew_Pay(false);
      setDetails({
        order: "",
        amount: "",
        currency: "",
      });
    });
  };

  return (
    <>
      {loading === "true" ? (
        <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
      ) : (
        <>
          <div className="container">
            <div className="add-card">
              <button className="btn float-right" onClick={handleButton}>
                Add Card
              </button>
            </div>
            {cardShow ? (
              <div className="row add-card">
                <div className="col-lg-8 mx-auto">
                  <div className="card card-form">
                    <div className="card-header">
                      <div className="float-right" onClick={handleClose}>
                        X
                      </div>
                      <div className="tab-content">
                        <div
                          id="credit-card"
                          className="tab-pane fade show active pt-3"
                        >
                          <form
                            action="file.php"
                            id="form"
                            onSubmit={handleSubmit}
                            noValidate
                          >
                            <div className="form-group">
                              <label htmlFor="username">
                                <h6>Card Owner</h6>
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Card Owner Name"
                                required
                                className="form-control "
                                onChange={handleChange}
                              />
                              {errors.name && dirty.name && (
                                <p className="error">{errors.name}</p>
                              )}
                            </div>
                            <div className="form-group">
                              <label htmlFor="cardNumber">
                                <h6>Card number</h6>
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  name="card_number"
                                  id="card_number"
                                  className="form-control"
                                  placeholder="Card Number"
                                  maxLength="16"
                                  onChange={handleChange}
                                  required
                                />
                                <div className="input-group-append">
                                  <span className="input-group-text text-muted">
                                    <i className="fab fa-cc-visa mx-1"></i>
                                    <i className="fab fa-cc-mastercard mx-1"></i>
                                    <i className="fab fa-cc-amex mx-1"></i>{" "}
                                  </span>
                                </div>
                              </div>
                              {errors.number && dirty.number && (
                                <p className="error">{errors.number}</p>
                              )}
                            </div>
                            <div className="row">
                              <div className="col-sm-8">
                                <div className="form-group">
                                  {" "}
                                  <label>
                                    <span className="hidden-xs">
                                      <h6>Expiration Date</h6>
                                    </span>
                                  </label>
                                  <div className="input-group">
                                    <input
                                      type="number"
                                      name="exp_month"
                                      id="exp_month"
                                      className="form-control"
                                      placeholder="Expiry Month"
                                      onChange={handleChange}
                                      required
                                    />
                                    <input
                                      type="number"
                                      name="exp_year"
                                      id="exp_year"
                                      className="form-control"
                                      placeholder="Expiry Year"
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                  {errors.exp_month && dirty.exp_month && (
                                    <p className="error">{errors.exp_month}</p>
                                  )}
                                  {errors.exp_year && dirty.exp_year && (
                                    <p className="error">{errors.exp_year}</p>
                                  )}
                                </div>
                              </div>
                              <div className="col-sm-4">
                                <div className="form-group mb-4">
                                  {" "}
                                  <label
                                    data-toggle="tooltip"
                                    title="Three digit CV code on the back of your card"
                                  >
                                    <h6>
                                      CVV{" "}
                                      <i className="fa fa-question-circle d-inline"></i>
                                    </h6>
                                  </label>{" "}
                                  <input
                                    type="number"
                                    name="cvv"
                                    id="cvv"
                                    className="form-control"
                                    placeholder="cvv"
                                    onChange={handleChange}
                                  />
                                </div>
                                {errors.cvv && dirty.cvv && (
                                  <p className="error">{errors.cvv}</p>
                                )}
                              </div>
                            </div>
                            <div className="card-footer">
                              <button
                                type="submit"
                                className="subscribe btn btn-primary btn-block shadow-sm"
                              >
                                {" "}
                                Add Card
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <>
              {data && data.length > 0 ? (
                <>
                  <div className="row">
                    {data.map((card) => {
                      return (
                        <div className="col">
                          <div className="credit-card-wrap">
                            <div className="mk-icon-world-map"></div>
                            <div className="credit-card-inner">
                              <div class="mk-icon-sim"></div>
                              <div class="credit-font credit-card-number">
                                {card.last_4}
                              </div>
                              <footer class="footer_credit">
                                <div class="clearfix">
                                  <div class="pull-left">
                                    <div class="credit-card-date">
                                      <span class="title">Expires End</span>
                                      <span class="credit-font">01/018</span>
                                    </div>
                                    <div class="credit-font credit-author">
                                      Test
                                    </div>
                                  </div>
                                  <div class="pull-right">
                                    <div class="mk-icon-visa"></div>
                                  </div>
                                </div>
                              </footer>
                            </div>
                            <div className="del-btn float-right">
                              <a  onClick={() => {
                                  confirmDelete(card.id);
                                }}>
                                  Delete
                                </a>
                            </div>
                            <div className="Pay-btn float-left">
                              <a onClick={() => {
                                  onPayShow(card.id);
                                }}>
                                  Pay
                                </a>
                            </div>
                            <Modal
                              displayModal={new_Pay}
                              closeModal={() => onHide()}
                              modalBody={
                                <>
                                  <div className="modal-body d-block text-left">
                                    <div className="modalcontent">
                                      <form id="form">
                                        <div className="row">
                                          <div className="col-md-12">
                                            <div className="form-group focused">
                                              <CLabel
                                                className="form-control-label"
                                                htmlFor="order"
                                              >
                                                Order
                                              </CLabel>
                                              <CInput
                                                onChange={onChange}
                                                id="order"
                                                className="form-control form-control-alternative"
                                                placeholder="Enter Dummy order"
                                                name="order"
                                                type="text"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="form-group focused">
                                              <CLabel
                                                className="form-control-label"
                                                htmlFor="amount"
                                              >
                                                Amount
                                              </CLabel>
                                              <CInput
                                                onChange={onChange}
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
                                                onChange={onChange}
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
                                              type="button"
                                              className="btn btn-light"
                                              onClick={() => onHide()}
                                            >
                                              CANCEL
                                            </button>
                                            <button
                                              type="submit"
                                              className="btn btn-primary ml-3"
                                              onClick={(e) => submitHandler(e)}
                                            >
                                              Submit
                                            </button>
                                          </div>
                                          {/* </div> */}
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </>
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : null}
            </>
          </div>
        </>
      )}
    </>
  );
}

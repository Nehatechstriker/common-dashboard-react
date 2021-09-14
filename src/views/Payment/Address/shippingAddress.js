import React, { useState, useEffect } from "react";
import "./address.css";
import * as session from "../../../services/session";
import { toast } from "react-toastify";
import { CInput, CLabel } from "@coreui/react";
import * as AddressServices from "../../../services/addressServices";
import Modal from "../../Modal/modal";
import { useHistory } from "react-router";
import image from "../../../assets/img/razorpay.jpg"
export default function ShippingAddress() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [getAddress, setGetAddress] = useState([]);
  const [show, setShow] = useState(false);
  const [new_address, setNew_Address] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [details, setDetails] = useState({
    address: "",
    country: "",
    city: "",
    pin: "",
  });
  useEffect(() => {
    const userData = JSON.parse(session.getSessionData());
    setName(userData.name);
    getAllAddress();
  }, []);
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setDetails({ ...details, [name]: value });
  };

  const getAllAddress = () => {
    AddressServices.getAddress().then((resp) => {
      try {
        if (resp.data.status_code == 200) {
          setGetAddress(resp.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  const validate = (values) => {
    let errors = {};

    if (!values.address) {
      errors.address = "This field is required";
    }
    if (!values.city) {
      errors.city = "This field is required";
    }

    if (!values.country) {
      errors.country = "This field is required";
    }
    return errors;
  };

  const onHide = () => {
    setShow(false);
    setNew_Address(false);
    document.getElementById("form").reset();
  };
  const onDelete = (id) => {
    AddressServices.deleteAddress({ data: { id: id } })
      .then((resp) => {
        getAllAddress();
      })
      .catch((err) => toast.error(err));
  };

  const onSet = (id) =>{
    history.push({ pathname: "/admin/payment" },id);
  }
const onRazor = (id)=>{
  history.push({ pathname: "/admin/razorpay" },id);
}

  const onAddressShow = () => {
    setNew_Address(true);
  };
  const submitHandler = async (event, id) => {
    setFormErrors(validate(details));
    event.preventDefault();

    const payload = {
      address: details.address,
      country: details.country,
      city: details.city,
      pin: details.pin,
    };

    if (Object.keys(validate(details)).length === 0) {
      await AddressServices.addAddress(payload)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            toast.success("Succesfully added");
            setNew_Address(false);
            getAllAddress();
            setDetails({
              address: "",
              country: "",
              city: "",
              pin: "",
            });
          }
        })
        .catch((err) => {
          if (err.response !== undefined) {
            for (let i of err.response.data.message) {
              toast.error(`${i.error}`);
            }
          }
        });
    }
  };

  return (
    <>
      <div className="container-form">
        <div className="address mt-4">
          <div className="d-flex">
            <span onClick={onAddressShow} className="add_new">
              <p>Add New address</p>
            </span>
          </div>
          <div className="d-grid">
            {getAddress.map((item, index) => {
              return (
                <div className="grid-address" key={index}>
                  <p>{item.address}</p>
                  <div className="d-flex justify-content-between flex-wrap">
                    <p>{item.city}</p>
                    <p>{item.country}</p>
                    <p>{item.pin}</p>
                  </div>

                  <div className="row mt-4">
                    <div className="col-6">
                      <a
                        className="btn-delete"
                        onClick={() => onDelete(item.id)}
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </a>
                    </div>
                    <div className="col-6">
                      <div className="row-display">
                      <a className="btn-payment" onClick={() => onSet(item.id)}>
                        <i class="fab fa-cc-stripe"></i>
                      </a>
                      <a
                        className="btn-payment"
                        onClick={() => onRazor(item.id)}
                      >
                       <img src={image}>
                       </img>
                      </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Modal
          displayModal={new_address}
          closeModal={() => onHide()}
          modalBody={
            <>
              <div className="mt-4 row pl-3">
                <div className="col-12">
                  <h4>Add Your New Address Detail</h4>
                </div>
              </div>
              <div className="modal-body d-block text-left">
                <div className="modalcontent">
                  <form id="form">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group focused">
                          <CLabel className="form-control-label" for="address">
                            Address
                          </CLabel>
                          <CInput
                            onChange={onChange}
                            id="address"
                            className="form-control form-control-alternative"
                            placeholder="Home Address"
                            name="address"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group focused">
                          <CLabel className="form-control-label" for="address">
                            City
                          </CLabel>
                          <CInput
                            onChange={onChange}
                            id="city"
                            className="form-control form-control-alternative"
                            placeholder="Enter your city"
                            name="city"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group focused">
                          <CLabel className="form-control-label" for="address">
                            Country
                          </CLabel>
                          <CInput
                            onChange={onChange}
                            id="country"
                            className="form-control form-control-alternative"
                            placeholder="Enter your Country"
                            name="country"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group focused">
                          <CLabel className="form-control-label" for="pin">
                            Pin Code
                          </CLabel>
                          <CInput
                            onChange={onChange}
                            id="pin"
                            className="form-control form-control-alternative"
                            placeholder="Enter your pin code"
                            name="pin"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row float-right mt-4">
                      <div className="col-12">
                        {/* <div className="modal-button"> */}
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
    </>
  );
}

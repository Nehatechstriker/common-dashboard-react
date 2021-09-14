import UserList from "views/Users.js";
import Chat from "views/Chat/ChatDesign";
import UserProfile from "views/UserProfile.js";
import Payment  from "views/Payment/stripe/stripe.js";
import Razorpay  from "views/Payment/RAZORPAY/razorpay";
import ShippingAddress from "views/Payment/Address/shippingAddress";
import Invoices from "views/Payment/Invoices/stripeInvoices";
import Success from "views/Payment/RAZORPAY/Success";
var routes = [
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Users",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: UserList,
    layout: "/admin",
  },
  {
    path: "/payment/shipping-address",
    name: "Address",
    icon: "tim-icons icon-align-center",
    component: ShippingAddress,
    layout: "/admin",
  },
  {
    path: "/success",
    name: "Success",
    icon: "tim-icons icon-align-center",
    component: Success,
    layout: "/admin",
  },
  {
    path: "/payment",
    name: "Payment",
    icon: "tim-icons icon-credit-card",
    component: Payment,
    layout: "/admin",
  },
  {
    path: "/razorpay",
    name: "Razorpay",
    icon: "tim-icons icon-credit-card",
    component: Razorpay,
    layout: "/admin",
  },
  {
    path: "/invoices",
    name: "Invoices",
    icon: "tim-icons icon-bank",
    component: Invoices,
    layout: "/admin",
  },
  {
    path: "/chat",
    name: "Chat",
    rtlName: "طباعة",
    icon: "tim-icons icon-chat-33 ",
    component: Chat,
    layout: "/admin",
  },
];
export default routes;

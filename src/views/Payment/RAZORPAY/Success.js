import "./success.css"

export default function Success() {

  return (
    <>
      <div className="content-success">
        <div className="wrapper-1">
          <div className="wrapper-2">
            <h1 className="thanks">Success </h1>
            {/* <p>Thanks for Order. </p> */}
            <p>Thank you for your payment  </p>
            <button className="go-home">go home</button>
          </div>
          <div className="footer-like">
            <p>
              <a href="/admin/razorpay">Back to Payment</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
// *{
//     box-sizing:border-box;
//    /* outline:1px solid ;*/
//   }
//   body{
//   background: #ffffff;
//   background: linear-gradient(to bottom, #ffffff 0%,#e1e8ed 100%);
//   filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#e1e8ed',GradientType=0 );
//       height: 100%;
//           margin: 0;
//           background-repeat: no-repeat;
//           background-attachment: fixed;
    
//   }
  
  

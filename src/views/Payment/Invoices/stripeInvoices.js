import React, { useEffect, useState } from "react";
import * as PaymentServices from "../../../services/paymentService";
import { MDBDataTableV5 } from "mdbreact";
export default function Invoices() {
  const [invoices, SetInvoices] = useState([]);

  useEffect(() => {
    PaymentServices.getInvoices().then((resp) => {
      const data = {
        columns: [
          {
            label: "Order",
            field: "order",
            width: 150,
            attributes: {
              "aria-controls": "DataTable",
              "aria-label": "Order",
            },
          },
          {
            label: "Amount",
            field: "amount",
            width: 270,
          },
          {
            label: "Payment Status",
            field: "payment_status",
            sort: "asc",
            width: 100,
          },
          {
            label: "Created At",
            field: "created_at",
            sort: "disabled",
            width: 150,
          },
        ],
        rows: resp.data.data.map((apiData) =>({ order: apiData.order,amount: apiData.amount,payment_status: apiData.status,created_at: apiData.created_at})),
      };
      SetInvoices(data);
    });
  }, []);
  return (
    <MDBDataTableV5
      hover
      entriesOptions={[5, 20, 25]}
      entries={5}
      pagesAmount={4}
      data={invoices}
    />
  );
}

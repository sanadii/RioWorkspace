import React, { useState } from "react";

// Components
import TransacitonOptions from "./TransactionOptions";
import TransactionConfirmation from "./TransactionConfirmation";

const InvoiceTransactionColumn = ({ invoice, invoiceItemList, overAllTotal, appointmentId }) => {
  const [checkoutStatus, setCheckoutStatus] = useState("paymentOptions");
  const [invoiceTransaction, setInvoiceTransaction] = useState(null);

  // Add other event handlers as needed
  return (
    <div className="sale__payment-col">
      <div className="sale__payment">
        {checkoutStatus === "paymentOptions" ? (
          <TransacitonOptions
            setCheckoutStatus={setCheckoutStatus}
            invoiceItemList={invoiceItemList}
            overAllTotal={overAllTotal}
            setInvoiceTransaction={setInvoiceTransaction}
          />
        ) : (
          <TransactionConfirmation
            invoice={invoice}
            setCheckoutStatus={setCheckoutStatus}
            invoiceTransaction={invoiceTransaction}
            setInvoiceTransaction={setInvoiceTransaction}
          />
        )}
      </div>
    </div>
  );
};

export default InvoiceTransactionColumn;

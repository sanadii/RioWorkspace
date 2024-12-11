import React, { useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { settingsSelector, appointmentsSelector } from "Selectors";
import { addInvoice, addTransaction, updateInvoice } from "store/actions";

const TransactionOptions = ({ setCheckoutStatus, invoiceItemList, overAllTotal, setInvoiceTransaction }) => {
  const dispatch = useDispatch();

  const { paymentTypes } = useSelector(settingsSelector);
  const { appointment } = useSelector(appointmentsSelector);
  const [selectedPaymentType, setSelectedPaymentType] = useState("");
  const appointmentId = appointment.id;
  const clientId = appointment.client.id;

  const [amountPaid, setAmountPaid] = useState(overAllTotal); // Default amount

  const currentDateTime = new Date();

  const handleTransactionOptionClick = (e, paymentValue) => {

    console.log("payment e: ", e)
    console.log("payment paymentValue: ", paymentValue)
    console.log("payment selectedPaymentType: ", selectedPaymentType)
    setSelectedPaymentType(paymentValue);
    const newTransaction = {
      date: currentDateTime,
      appointment: appointmentId,
      client: clientId,
      paid: amountPaid,
      totalAmount: overAllTotal,
      status: "pending",
      paymentType: paymentValue,
      accountType: "revenue",
      invoiceType: "appointment",
      invoiceItems: invoiceItemList,
      note: "",
    };
    setInvoiceTransaction(newTransaction);
    setCheckoutStatus("paymentConfirmation");
  };
  const handleTransactionAmountChange = (e) => {
    setAmountPaid(e.target.value);
  };

  return (
    <div className="sale__payment-options-container">
      <div className="sale__payment-head">
        <div className="sale__amount-field">
          <input
            type="number"
            step="any"
            className="sale__input--xl form-control"
            data-testid="sale__amount-amount-input"
            value={amountPaid}
            onClick={() => handleTransactionAmountChange("")}
          />
        </div>
        <div className="sale__label sale__payment-amount-label">Edit to make partial payment</div>
      </div>
      <div className="sale__payment-options">
        {/* Repeat for each payment option */}

        {paymentTypes.map((payment) => (
          <div
            key={payment.id}
            className="sale__payment-option sale__payment-option--dark"
            data-testid="sale__payment-option"
            onClick={() => handleTransactionOptionClick("paymentConfirmation", payment.value)}
          >
            <div className="sale__payment-option-card sale__card">
              <div className="sale__payment-option-label">{payment.name}</div>
              <div className="sale__payment-option-details">mark as paid</div>
            </div>
          </div>
        ))}
      </div>
      <div className="sale__payment-options-extras">
        <button className="sale__button-link sale__button-link--underlined">or, charge to account (no payment)</button>
      </div>
    </div>
  );
};

export default TransactionOptions;

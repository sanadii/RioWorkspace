import React, { useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { settingsSelector, appointmentsSelector } from "Selectors";
import { addInvoice, updateInvoice } from "store/actions";

const Payment = ({ invoiceItemList, overAllTotal, appointmentId }) => {
  const [checkoutStatus, setCheckoutStatus] = useState("paymentOptions");
  const [invoiceTransaction, setInvoiceTransaction] = useState(null);

  // Add other event handlers as needed
  return (
    <div className="sale__payment">
      {checkoutStatus === "paymentOptions" ? (
        <PaymentOptions
          setCheckoutStatus={setCheckoutStatus}
          invoiceItemList={invoiceItemList}
          overAllTotal={overAllTotal}
          setInvoiceTransaction={setInvoiceTransaction}
        />
      ) : (
        <PaymentConfirmation setCheckoutStatus={setCheckoutStatus} setInvoiceTransaction={setInvoiceTransaction} />
      )}
    </div>
  );
};

const PaymentOptions = ({ setCheckoutStatus, invoiceItemList, overAllTotal, setInvoiceTransaction }) => {
  const dispatch = useDispatch();

  const { TransactionStatus } = useSelector(settingsSelector);
  const { appointment } = useSelector(appointmentsSelector);
  const appointmentId = appointment.id;
  const clientId = appointment.client;

  const [amount, setAmount] = useState(overAllTotal); // Default amount

  const currentDateTime = new Date();

  const handlePaymentClick = (e) => {
    const newTransaction = {
      date: currentDateTime,
      appointment: appointmentId,
      client: clientId,
      paid: amount,
      status: "active",
      payment_type: "",
      account: "revenue",
      invoiceItems: invoiceItemList,
    };
    setInvoiceTransaction(newTransaction);
    setCheckoutStatus("paymentConfirmation");
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
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
            value={amount}
            onClick={() => handleAmountChange("")}
          />
        </div>
        <div className="sale__label sale__payment-amount-label">Edit to make partial payment</div>
      </div>
      <div className="sale__payment-options">
        {/* Repeat for each payment option */}

        {TransactionStatus.map((payment) => (
          <div
            key={payment.id}
            className="sale__payment-option sale__payment-option--dark"
            data-testid="sale__payment-option"
            onClick={() => handlePaymentClick("paymentConfirmation")}
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

const PaymentConfirmation = ({ setCheckoutStatus, invoiceTransaction, setInvoiceTransaction }) => {
  const dispatch = useDispatch();

  const handleTabToReturnTab = () => {
    // Assuming prevTransaction is the current state of your transaction
    const updatedTransaction = {
      ...invoiceTransaction, // Spread the properties of the previous transaction
      status: "active", // Update the status
    };

    setInvoiceTransaction(updatedTransaction);
    dispatch(updateInvoice(updatedTransaction));
    setCheckoutStatus("paymentOptions");
  };

  const handleTapToComplete = () => {};
  return (
    <div>
      <div className="sale__payment-container">
        <div className="sale__complete-container">
          <div className="sale__payment-head">
            <h1>Review and complete</h1>
          </div>
          <div></div>
          <div>
            <button
              data-testid="sale__complete-button"
              id="sale__complete-button-id"
              type="button"
              className="btn sale__button sale__button--xl sale__button-midnight button-module_btn-width-fit__Q4Slu "
              onClick={handleTapToComplete}
            >
              Tap to complete
            </button>
          </div>
          <div className="sale__payment-options-extras">
            <button className="sale__button-link sale__button-link--underlined" onClick={handleTabToReturnTab}>
              or, Tab to to return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Payment;

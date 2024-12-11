import React, { useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addInvoice, addTransaction, updateInvoice } from "store/actions";

const TransactionConfirmation = ({ invoice, setCheckoutStatus, invoiceTransaction, setInvoiceTransaction }) => {
  const dispatch = useDispatch();

  const handleTabToReturnTab = () => {
    // Assuming prevTransaction is the current state of your transaction
    setCheckoutStatus("paymentOptions");
  };

  const handleTapToComplete = () => {
    const updatedTransaction = {
      // I need the invoice ID
      ...invoiceTransaction,
      invoice: invoice.id,
      amount: 30, // Update the status
    };

    setInvoiceTransaction(updatedTransaction);
    dispatch(addTransaction(updatedTransaction));
  };

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
export default TransactionConfirmation;

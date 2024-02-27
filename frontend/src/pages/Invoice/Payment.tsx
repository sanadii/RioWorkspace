import React, { useState } from "react";

const Payment = () => {
  const [amount, setAmount] = useState(160); // Default amount

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Add other event handlers as needed

  return (
    <div className="sale__payment">
      <div className="sale__payment-mobile-totals">
        <div className="sale__summary-totals">
          <div className="sale__summary-total-line sale__summary-total">
            <div className="sale__summary-total-line-info">
              <div className="sale__summary-total-line-label">Total</div>
              <div className="sale__summary-total-line-value">K.D.{amount}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="sale__payment-options-container">
        <div className="sale__payment-head">
          <div className="sale__amount-field">
            <input
              type="number"
              step="any"
              className="sale__input--xl form-control"
              data-testid="sale__amount-amount-input"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <div className="sale__label sale__payment-amount-label">Edit to make partial payment</div>
        </div>
        <div className="sale__payment-options">
          {/* Repeat for each payment option */}
          <div className="sale__payment-option sale__payment-option--dark" data-testid="sale__payment-option">
            <div className="sale__payment-option-card sale__card">
              <div className="sale__payment-option-label">Credit card</div>
              <div className="sale__payment-option-details">mark as paid</div>
            </div>
          </div>

          <div className="sale__payment-option sale__payment-option--dark" data-testid="sale__payment-option">
            <div className="sale__payment-option-card sale__card">
              <div className="sale__payment-option-label">Cash</div>
              <div className="sale__payment-option-details">mark as paid</div>
            </div>
          </div>

          <div className="sale__payment-option sale__payment-option--dark" data-testid="sale__payment-option">
            <div className="sale__payment-option-card sale__card">
              <div className="sale__payment-option-label">Link</div>
              <div className="sale__payment-option-details">mark as paid</div>
            </div>
          </div>

          <div className="sale__payment-option sale__payment-option--dark" data-testid="sale__payment-option">
            <div className="sale__payment-option-card sale__card">
              <div className="sale__payment-option-label">Voucher</div>
              <div className="sale__payment-option-details">mark as paid</div>
            </div>
          </div>
        </div>
        <div className="sale__payment-options-extras">
          <button className="sale__button-link sale__button-link--underlined">
            or, charge to account (no payment)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;

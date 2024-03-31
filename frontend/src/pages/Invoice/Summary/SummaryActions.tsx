import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateAppointment, addInvoice } from "store/actions";

import { Button, Label } from "reactstrap";
import SummarySaleExtras from "./SummarySaleExtras";

const SummaryActions = ({
  isAddingNote,
  setIsAddingNote,
  appointment,
  setIspayment,
  appointmentNote,
  setAppointmentNote,
  updatedAppointment,
  isPayment,
  overallTotal,
}) => {
  const dispatch = useDispatch();

  const handleAddNoteClick = () => {
    setIsAddingNote(true);
  };
  const handleCheckoutClick = () => {
    setIspayment(true);
    // dispatch(updateAppointment(updatedAppointment));
    dispatch(addInvoice(updatedAppointment));
  };

  const handleEditInvoiceClick = () => {
    setIspayment(false);
  };

  return (
    <div className="sale__summary-actions">
      <div className="sale__summary-actions-more">
        <div className="sale__summary-options">
          <button
            className="sale__button-link sale__button-link--underlined"
            id="sale__add-note-button"
            onClick={handleAddNoteClick}
          >
            Add note
          </button>
          &nbsp;or&nbsp;
          <button className="sale__button-link sale__button-link--underlined" data-testid="sale__add-discount">
            discount
          </button>
        </div>
        {/* <div className="sale__summary-tax">Tax K.D.0</div> */}
      </div>
      <div className="sale__summary-totals"></div>

      {isAddingNote ? (
        <div className="sale__summary-note">
          <div className="sale__summary-note-label">
            <Label id="sale-note-field">Note</Label>
            <Button className="sale__button-link" onClick={() => setIsAddingNote(false)}>
              ×
            </Button>
          </div>
          <textarea
            data-testid="sale__note-field"
            data-automationid="tui-textarea"
            className="form-control textarea-module_formControl__1hsMA"
            name="sale-note-field"
            placeholder="Add Notes"
            value={appointmentNote}
            onChange={(e) => setAppointmentNote(e.target.value)} // Extract the value from the event object
          ></textarea>
        </div>
      ) : (
        ""
      )}

      <div className="sale__summary-totals">
        <div className="sale__summary-total-line sale__summary-total">
          <div className="sale__summary-total-line-info">
            <div className="sale__summary-total-line-label">Total </div>
            <div className="sale__summary-total-line-value">K.D.55</div>
          </div>
        </div>
        <div className="sale__summary-total-payments">
          <div role="button" className="sale__summary-total-line   sale__summary-total-line--clickable">
            <div className="sale__summary-total-line-info">
              <div className="sale__summary-total-line-label">Credit card</div>
              <div className="sale__summary-total-line-value">K.D.2</div>
              <button className="sale__button-link sale__summary-total-line-remove">×</button>
            </div>
          </div>
        </div>
        <div className="sale__summary-total-line sale__summary-total-line--dark">
          <div className="sale__summary-total-line-info">
            <div className="sale__summary-total-line-value">K.D.53 UNPAID</div>
          </div>
        </div>
      </div>
      <SummarySaleExtras />
      {isPayment ? (
        <button
          // variant="primary"
          // size="lg"
          // loading="false"
          data-testid="sale__checkout-button"
          className="sale__summary-checkout-button tui-button tui-button--lg tui-button--primary primary hydrated"
          onClick={handleEditInvoiceClick}
        >
          Edit Invoice K.D.{overallTotal}
        </button>
      ) : (
        <button
          // variant="primary"
          // size="lg"
          // loading="false"
          data-testid="sale__checkout-button"
          className="sale__summary-checkout-button tui-button tui-button--lg tui-button--primary primary hydrated"
          onClick={handleCheckoutClick}
        >
          Checkout K.D.{overallTotal}
        </button>
      )}
    </div>
  );
};

export default SummaryActions;

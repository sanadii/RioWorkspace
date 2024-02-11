import React, { useState } from "react";
import { Button, ButtonGroup, Col, Row } from "reactstrap";

const EditorStatusComponent = ({ statusRef }) => {
  const [selectedStatus, setSelectedStatus] = useState(1);
  const [isListOpen, setIsListOpen] = useState(false);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  // console.log("appointmentConfirmed:", appointmentConfirmed);
  const handlePencilledInClick = () => {
    setIsListOpen(false);
    setAppointmentConfirmed(false);
    setSelectedStatus(0);
  };

  const handleConfirmedClick = () => {
    setIsListOpen(true);
    setAppointmentConfirmed(true);
    setSelectedStatus(1);
  };

  const handleOptionSelect = (value) => {
    setSelectedStatus(value);
    console.log("Selected value:", value);
  };

  const statusOptions = {
    2: "Not started",
    3: "Arrived",
    4: "Started",
    5: "Completed",
    6: "Did not show",
  };

  return (
    <Row className="mt-3">
      <Col lg={8} className="d-flex">
        <Button
          className={appointmentConfirmed ? "btn-soft-secondary" : "btn-secondary mb-0"}
          id="btncheck1"
          onClick={handlePencilledInClick}
        >
          Pencilled-in
        </Button>
        <Button
          className={!appointmentConfirmed ? "btn-soft-secondary" : "btn-secondary mb-0"}
          id="btncheck2"
          onClick={handleConfirmedClick}
        >
          Confirmed
        </Button>
        {isListOpen && (
          <select
            id="appointment-confirmed-status"
            name="appointmentConfirmationStatus"
            className="form-select"
            onChange={(e) => handleOptionSelect(Number(e.target.value))}
          >
            {Object.entries(statusOptions).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        )}
      </Col>
      <Col lg={4}>
        <div className="d-flex justify-content-end align-items-center">
          <div className="ms-2">
            <input type="hidden" className="save-and-add-deposit-value" value="false" />
            <div className="booking-status__invoice">
              <div className="add-deposit-container">
                <Button color="primary" outline>
                  Add deposit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export { EditorStatusComponent };

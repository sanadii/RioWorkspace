const SummaryCustomer = ({ appointment }) => {
  const clientName = appointment.client?.name;
  const clientMobile = appointment.client?.mobile;

  return (
    <div className="sale__summary-customer">
      <div className="sale__customer">
        <div>
          <div className="sale__customer-picker ">
            <div className="sale__customer-picker-heading sale__heading--domaine">
              <div className="sale__customer-picker-heading-text">Select client</div>
            </div>
            <div className="sale__customer-picker-selected">
              <div className="sale__customer-picker-selected-details">
                <div className="sale__customer-picker-selected-name">
                  <span className="sale__customer-picker-customer-name">{clientName} </span>
                </div>
                <div className="sale__customer-picker-selected-phone">+{clientMobile}</div>
              </div>
              <div className="sale__customer-picker-selected-remove" data-testid="sale__customer-remove-button">
                ×
              </div>
            </div>
          </div>
        </div>
        <div className="sale__customer-selected">
          <div className="sale__customer-balances"></div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCustomer;

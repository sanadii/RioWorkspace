const SummaryCustomer = ({ activeInvoice }) => {
  const clientName = activeInvoice.client?.name;
  const clientMobile = activeInvoice.client?.mobile;

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
              <i className="mdi mdi-close float-end"></i>
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

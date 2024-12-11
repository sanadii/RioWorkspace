import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { InvoiceProps, InvoiceItemListProps } from "types";

// Redux
import { getAppointment, getSchedule, getInvoiceById } from "store/actions";
import { settingsSelector, appointmentsSelector, invoiceSelector } from "Selectors";

// Components
import InvoiceAddingColumn from "./InvoiceAddingColumn";
import InvoiceSummaryColumn from "./InvoiceSummaryColumn";
import InvoiceTransactionColumn from "./InvoiceTransactionColumn";


const Invoice = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { appointment, staff } = useSelector(appointmentsSelector);
  const { discountOptions } = useSelector(settingsSelector);
  const { invoice } = useSelector(invoiceSelector);

  const queryParams = new URLSearchParams(location.search);
  const appointmentId = queryParams.get("appointmentId" || null);
  const invoiceId = queryParams.get("invoiceId" || null);
  const clientDetails = (appointmentId && appointment.client) || (invoiceId && invoice.client);

  const [activeInvoice, setActiveInvoice] = useState<InvoiceProps>();
  const [invoiceItemList, setInvoiceItemList] = useState<InvoiceItemListProps>();

  const [overAllTotal, setOverAllTotal] = useState(0);
  const [isTransaction, setIsTransaction] = useState(false);


  useEffect(() => {
    const now = new Date().toISOString();

    let appointmentList = [];
    if (appointmentId && appointment) {
      const invoiceAppointment = {
        id: appointment.id,
        title: appointment.title,
        start: appointment.start,
        services: appointment.services?.map((service) => ({
          id: service?.id,
          itemId: service?.serviceId,
          name: service?.name,
          unitPrice: service?.price,
          staff: service?.staff,
          quantity: 1,
          start: service?.start,
          end: service?.end,
          duration: service?.duration,
          // Other service properties if needed
        })),
        // Include any other appointment properties here
      };

      appointmentList = [invoiceAppointment];
    }

    setActiveInvoice({
      id: invoiceId ? invoice?.id : null,
      date: invoiceId ? invoice?.date : now,
      client: clientDetails,
      appointment: invoiceId ? invoice?.appointment : appointment?.id,
      amount: invoiceId && invoice ? invoice?.amount : "0",
      items: {
        appointmentList: appointmentList,
        packageList: invoiceId ? invoice?.packages : appointment?.packages || [],
        productList: invoiceId ? invoice?.products : appointment?.products || [],
        voucherList: invoiceId ? invoice?.vouchers : appointment?.vouchers || [],
      },
      status: invoice?.status || "",
      note: invoiceId ? invoice?.note : appointment?.note || "",
    });
  }, [appointmentId, invoiceId, clientDetails, invoice, appointment]);

  useEffect(() => {
    if (activeInvoice) {
      setInvoiceItemList(
        activeInvoice.items || {
          appointmentList: [],
          packageList: [],
          productList: [],
          voucherList: [],
        }
      );
    }
  }, [activeInvoice]);

  useEffect(() => {
    if (appointmentId) {
      dispatch(getAppointment(appointmentId));
    }
    if (invoiceId) {
      dispatch(getInvoiceById(invoiceId));
    }
    dispatch(getSchedule());
  }, [dispatch, appointmentId, invoiceId]);

  return (
    <React.Fragment>
      {(appointmentId || invoiceId) && invoiceItemList && (
        <div className="sale__body">
          {/* Invoice Adding Column */}
          {!isTransaction && (
            <InvoiceAddingColumn invoiceItemList={invoiceItemList} setInvoiceItemList={setInvoiceItemList} />
          )}

          {/* Invoice Summary */}
          <InvoiceSummaryColumn
            activeInvoice={activeInvoice}
            invoiceItemList={invoiceItemList}
            staff={staff}
            client={appointment?.client}
            startTime={appointment?.startTime}
            setInvoiceItemList={setInvoiceItemList}
            discountOptions={discountOptions}
            setIsTransaction={setIsTransaction}
            isTransaction={isTransaction}
            setOverAllTotal={setOverAllTotal}
          />

          {/* Invoice Transaction */}
          {isTransaction && (
            <InvoiceTransactionColumn
              invoice={invoice}
              invoiceItemList={invoiceItemList}
              overAllTotal={overAllTotal}
              appointmentId={appointmentId}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Invoice;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAppointment, getSchedule, getInvoiceById } from "store/actions";
import { settingsSelector, appointmentsSelector, invoiceSelector } from "Selectors";

// Components
import InvoiceAddingColumn from "./InvoiceAddingColumn";
import InvoiceSummaryColumn from "./InvoiceSummaryColumn";
import InvoiceTransactionColumn from "./InvoiceTransactionColumn";

import { InvoiceProps, InvoiceItemList } from "types";

const Invoice = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { appointment, packages, staff } = useSelector(appointmentsSelector);
  const { discountOptions } = useSelector(settingsSelector);
  const { invoice } = useSelector(invoiceSelector);

  const queryParams = new URLSearchParams(location.search);
  const appointmentId = queryParams.get("appointmentId" || null);
  const invoiceId = queryParams.get("invoiceId" || null);

  const [activeInvoice, setActiveInvoice] = useState<InvoiceProps>();
  const [invoiceItemList, setInvoiceItemList] = useState<InvoiceItemList>();
  const [overAllTotal, setOverAllTotal] = useState(0);
  const [isTransaction, setIsTransaction] = useState(false);

  // console.log("activeInvoice: ", activeInvoice);
  useEffect(() => {
    let invoiceAppointmentList = [];
    const now = new Date().toISOString();

    if (appointmentId && appointment?.services) {
      invoiceAppointmentList = appointment.services.map((service) => ({
        id: service.id,
        appointment: appointment.id,
        itemId: service.serviceId,
        name: service.name,
        unitPrice: service.price,
        staff: service.staff,
        quantity: 1,
        start: service.start,
        end: service.end,
        duration: service.duration,
        // isPackageRedeemed: service.isPackageRedeemed,
      }));
    }

    setActiveInvoice({
      id: invoiceId ? invoice?.id : null,
      date: invoiceId ? invoice?.date : now,
      client: invoiceId ? invoice?.client : appointment?.client?.id,
      appointment: invoiceId ? invoice?.appointment : appointment?.id,
      amount: invoiceId && invoice ? invoice?.amount : "0",
      items: {
        serviceList: invoiceAppointmentList || [],
        packageList: invoiceId ? invoice?.packages : appointment?.packages || [],
        productList: invoiceId ? invoice?.products : appointment?.products || [],
        voucherList: invoiceId ? invoice?.vouchers : appointment?.vouchers || [],
      },
      status: invoice?.status || "",
      note: invoiceId ? invoice?.note : appointment?.note || "",
    });
  }, [appointmentId, invoiceId, invoice, appointment]);

  useEffect(() => {
    if (activeInvoice) {
      setInvoiceItemList(
        activeInvoice.items || {
          serviceList: [],
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

  console.log("packages: ", packages);
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
            appointment={appointment}
            staff={staff}
            client={appointment?.client}
            startTime={appointment?.startTime}
            invoiceItemList={invoiceItemList}
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

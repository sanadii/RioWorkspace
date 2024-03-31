
// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectExpenseState = state => state.Invoice;

export const invoiceSelector = createSelector(
  selectExpenseState,
  (invoiceSelector) => ({
    
    // Invoice Selectors
    invoices: invoiceSelector.invoices,
    invoice: invoiceSelector.invoice,
    transactions: invoiceSelector.transactions,
    isInvoiceSuccess: invoiceSelector.isInvoiceSuccess,
    // isTransacionSuccess: invoiceSelector.isTransacionSuccess,
    error: invoiceSelector.error,
  })
);

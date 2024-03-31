import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  // Invoices
  GET_INVOICES,
  GET_INVOICE_BY_ID,
  ADD_INVOICE_SUCCESS,
  ADD_INVOICE_FAIL,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_FAIL,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAIL,

  // Transactions
  GET_TRANSACTIONS,
  GET_TRANSACTION_BY_ID,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAIL,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAIL,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAIL,
} from "./actionType";

const INIT_STATE = {
  invoices: [],
  invoice: [],
  transactions: [],
  error: {},
};

const Invoice = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_INVOICES:
          return {
            ...state,
            invoices: action.payload.data,
            isInvoiceCreated: false,
            isInvoiceSuccess: true
          };

        case GET_INVOICE_BY_ID:
          return {
            ...state,
            invoice: action.payload.data,
            isInvoiceCreated: false,
            isInvoiceSuccess: true
          };

        case GET_TRANSACTIONS:
          return {
            ...state,
            transactions: action.payload.data,
            isInvoiceCreated: false,
            isInvoiceSuccess: true
          };

        case GET_TRANSACTION_BY_ID:
          return {
            ...state,
            transaction: action.payload.data,
            isTransactionCreated: false,
            isTransactionSuccess: true
          };

        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_INVOICES:
          return {
            ...state,
            error: action.payload.error,
            isInvoiceCreated: false,
            isInvoiceSuccess: false
          };
        case GET_INVOICE_BY_ID:
          return {
            ...state,
            error: action.payload.error,
            isInvoiceCreated: false,
            isInvoiceSuccess: false
          };

        case GET_TRANSACTIONS:
          return {
            ...state,
            error: action.payload.error,
            isInvoiceCreated: false,
            isInvoiceSuccess: false
          };

        case GET_TRANSACTION_BY_ID:
          return {
            ...state,
            error: action.payload.error,
            isTransactionCreated: false,
            isTransactionSuccess: false
          };

        default:
          return { ...state };
      }

    // 
    // Invoices
    // 
    case ADD_INVOICE_SUCCESS:
      return {
        ...state,
        isInvoiceCreated: true,
        invoices: [...state.invoices, action.payload.data],
        invoice: action.payload.data,
        isInvoiceAdd: true,
        isInvoiceAddFail: false,

      };

    case ADD_INVOICE_FAIL:
      return {
        ...state,
        error: action.payload,
        isInvoiceAdd: false,
        isInvoiceAddFail: true,
      };

    case UPDATE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: state.invoices.map((dailyInvoice) =>
          dailyInvoice.id.toString() === action.payload.data.id.toString()
            ? { ...dailyInvoice, ...action.payload.data }
            : dailyInvoice
        ),
        invoice: action.payload.data,
      };

    case UPDATE_INVOICE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_INVOICE_SUCCESS:

      return {
        ...state,
        invoices: state.invoices.filter(
          (dailyInvoice) => dailyInvoice.id.toString() !== action.payload.dailyInvoice.toString()
        ),
        isInvoiceDelete: true,
        isInvoiceFail: false,
      };

    case DELETE_INVOICE_FAIL:
      return {
        ...state,
        error: action.payload,
        isInvoiceDelete: false,
        isInvoiceFail: true,

      };
    // 
    // Transactions
    // 
    case ADD_TRANSACTION_SUCCESS:
      return {
        ...state,
        isTransactionCreated: true,
        transactions: [...state.transactions, action.payload.data],
        isTransactionAdd: true,
        isTransactionAddFail: false,

      };

    case ADD_TRANSACTION_FAIL:
      return {
        ...state,
        error: action.payload,
        isTransactionAdd: false,
        isTransactionAddFail: true,
      };

    case UPDATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: state.transactions.map((dailyTransaction) =>
          dailyTransaction.id.toString() === action.payload.data.id.toString()
            ? { ...dailyTransaction, ...action.payload.data }
            : dailyTransaction
        ),
      };

    case UPDATE_TRANSACTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_TRANSACTION_SUCCESS:

      return {
        ...state,
        transactions: state.transactions.filter(
          (dailyTransaction) => dailyTransaction.id.toString() !== action.payload.dailyTransaction.toString()
        ),
        isTransactionDelete: true,
        isTransactionFail: false,
      };

    case DELETE_TRANSACTION_FAIL:
      return {
        ...state,
        error: action.payload,
        isTransactionDelete: false,
        isTransactionFail: true,

      };


    default:
      return { ...state };
  }
};

export default Invoice;
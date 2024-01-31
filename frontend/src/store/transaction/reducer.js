import {
  GET_TRANSACTIONS,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAIL,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAIL,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAIL,
} from "./actionType";

const INIT_STATE = {
  transactions: [],
  error: {},
};

const Transaction = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_TRANSACTIONS:
          return {
            ...state,
            transactions: action.payload.data,
            isTransactionCreated: false,
            isTransactionSuccess: true
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_TRANSACTIONS:
          return {
            ...state,
            error: action.payload.error,
            isTransactionCreated: false,
            isTransactionSuccess: false
          };
        default:
          return { ...state };
      }

    case ADD_TRANSACTION_SUCCESS:
      return {
        ...state,
        isTransactionCreated: true,
        transactions: [...state.transactions, action.payload.data],
      };

    case ADD_TRANSACTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction._id.toString() === action.payload.data._id.toString()
            ? { ...transaction, ...action.payload.data }
            : transaction
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
          transaction => transaction._id.toString() !== action.payload.transaction.toString()
        ),
      };

    case DELETE_TRANSACTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default Transaction;
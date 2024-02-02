import {
  GET_EXPENSES,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_FAIL,
  UPDATE_EXPENSE_SUCCESS,
  UPDATE_EXPENSE_FAIL,
  DELETE_EXPENSE_SUCCESS,
  DELETE_EXPENSE_FAIL,
} from "./actionType";

const INIT_STATE = {
  expenses: [],
  error: {},
};

const Expense = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_EXPENSES:
          return {
            ...state,
            expenses: action.payload.data,
            isExpenseCreated: false,
            isExpenseSuccess: true
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_EXPENSES:
          return {
            ...state,
            error: action.payload.error,
            isExpenseCreated: false,
            isExpenseSuccess: false
          };
        default:
          return { ...state };
      }

    case ADD_EXPENSE_SUCCESS:
      return {
        ...state,
        isExpenseCreated: true,
        expenses: [...state.expenses, action.payload.data],
        isExpenseAdd: true,
        isExpenseAddFail: false,

      };

    case ADD_EXPENSE_FAIL:
      return {
        ...state,
        error: action.payload,
        isExpenseAdd: false,
        isExpenseAddFail: true,
      };

    case UPDATE_EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id.toString() === action.payload.data.id.toString()
            ? { ...expense, ...action.payload.data }
            : expense
        ),
      };

    case UPDATE_EXPENSE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_EXPENSE_SUCCESS:

      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id.toString() !== action.payload.expense.toString()
        ),
        isExpenseDelete: true,
        isExpenseFail: false,
      };

    case DELETE_EXPENSE_FAIL:
      return {
        ...state,
        error: action.payload,
        isExpenseDelete: false,
        isExpenseFail: true,

      };

    default:
      return { ...state };
  }
};

export default Expense;
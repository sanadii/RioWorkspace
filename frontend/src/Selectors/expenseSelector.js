// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectExpenseState = state => state.Expense;

export const expenseSelector = createSelector(
  selectExpenseState,
  (expenseSelector) => ({
    
    // Daily Revenues Selectors
    expenses: expenseSelector.expenses,
    isExpenseSuccess: expenseSelector.isExpenseSuccess,
    error: expenseSelector.error,

  })
);

// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectSettingOptionsState = state => state.SettingOptions;

export const settingOptionsSelector = createSelector(
  selectSettingOptionsState,
  (settingOptionsSelector) => ({
    
    // Daily Revenues Selectors
    // RevenueStatusOptions: settingOptionsSelector.settingOptions.RevenueStatus,
    ExpensesCategoryOptions: settingOptionsSelector.ExpensesCategory,
    ExpensesStatusOptions: settingOptionsSelector.ExpensesStatus,
    PaidByOptions: settingOptionsSelector.PaidBy,
    TransactionStatusOptions: settingOptionsSelector.TransactionStatus,
    isSettingOptionsSuccess: settingOptionsSelector.isSettingOptionsSuccess,
    error: settingOptionsSelector.error,

    

  })
);

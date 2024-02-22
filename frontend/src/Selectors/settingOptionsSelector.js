// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectSettingOptionsState = state => state.SettingOptions;

export const settingOptionsSelector = createSelector(
  selectSettingOptionsState,
  (settingOptionsSelector) => ({
    
    // Daily Revenues Selectors
    // RevenueStatusOptions: settingOptionsSelector.settingOptions.RevenueStatus,
    ExpensesCategoryOptions: settingOptionsSelector.settingOptions?.ExpensesCategory,
    ExpensesStatusOptions: settingOptionsSelector.settingOptions?.ExpensesStatus,
    PaidByOptions: settingOptionsSelector.settingOptions?.PaidBy,
    TransactionStatusOptions: settingOptionsSelector.settingOptions?.TransactionStatus,
    discountOptions: settingOptionsSelector.settingOptions?.Discount,
    isSettingOptionsSuccess: settingOptionsSelector.isSettingOptionsSuccess,
    error: settingOptionsSelector.error,
  })
);

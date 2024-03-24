// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectSettingOptionsState = state => state.SettingOptions;
const selectSettingChoicesState = state => state.SettingChoices;

export const settingOptionsSelector = createSelector(
  selectSettingOptionsState,
  (settingOptionsSelector) => ({

    settingOptions: settingOptionsSelector.settingOptions,
    // isSettingOptionsSuccess: settingOptionsSelector.isSettingOptionsSuccess,
    error: settingOptionsSelector.error,
  })
);

export const settingChoicesSelector = createSelector(
  selectSettingChoicesState,
  (settingChoicesSelector) => ({

    // Daily Revenues Selectors
    // RevenueStatusOptions: settingOptionsSelector.settingOptions.RevenueStatus,
    ExpensesCategoryOptions: settingChoicesSelector.settingOptions?.ExpensesCategory,
    ExpensesStatusOptions: settingChoicesSelector.settingOptions?.ExpensesStatus,
    PaidByOptions: settingChoicesSelector.settingOptions?.PaidBy,
    TransactionStatusOptions: settingChoicesSelector.settingOptions?.TransactionStatus,
    discountOptions: settingChoicesSelector.settingOptions?.Discount,
    isSettingOptionsSuccess: settingChoicesSelector.isSettingOptionsSuccess,
    error: settingChoicesSelector.error,
  })
);


// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectSettingsState = state => state.Settings;

export const settingsSelector = createSelector(
  selectSettingsState,
  (settingsSelector) => ({

    // Setting Options
    settingOptions: settingsSelector.settingOptions,

    // Setting Choices
    
    // Daily Revenues Selectors
    // RevenueStatusOptions: settingsSelector.settingOptions.RevenueStatus,
    ExpensesCategoryOptions: settingsSelector.settingChoices?.ExpensesCategory,
    ExpensesStatusOptions: settingsSelector.settingChoices?.ExpensesStatus,
    PaidByOptions: settingsSelector.settingOpsettingChoicestions?.PaidBy,
    TransactionStatus: settingsSelector.settingChoices?.TransactionStatus,
    discountOptions: settingsSelector.settingChoices?.Discount,

    // Success and Error
    isSettingsSuccess: settingsSelector.isSettingOptionsSuccess,
    error: settingsSelector.error,
  })
);


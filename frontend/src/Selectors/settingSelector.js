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
    ExpensesCategoryOptions: settingsSelector.settingChoices?.expensesCategory,
    ExpensesStatusOptions: settingsSelector.settingChoices?.expensesStatus,
    PaidByOptions: settingsSelector.settingOpsettingChoicestions?.paidBy,
    PaymentTypes: settingsSelector.settingChoices?.paymentTypes,
    discountOption: settingsSelector.settingChoices?.discountOption,

    // Success and Error
    isSettingsSuccess: settingsSelector.isSettingOptionsSuccess,
    error: settingsSelector.error,
  })
);


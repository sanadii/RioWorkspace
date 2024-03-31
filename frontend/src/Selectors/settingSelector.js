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
    expensesCategoryOptions: settingsSelector.settingChoices?.expensesCategories,
    expensesStatusOptions: settingsSelector.settingChoices?.expensesStatuses,
    paidByOptions: settingsSelector.settingOpsettingChoicestions?.paidBy,
    paymentTypes: settingsSelector.settingChoices?.paymentTypes,
    discountOptions : settingsSelector.settingChoices?.discountOptions ,

    // Success and Error
    isSettingsSuccess: settingsSelector.isSettingOptionsSuccess,
    error: settingsSelector.error,
  })
);


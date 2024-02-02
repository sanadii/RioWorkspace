// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectRevenueState = state => state.Revenue;

export const revenuesSelector = createSelector(
  selectRevenueState,
  (revenuesSelector) => ({
    
    // Daily Revenues Selectors
    revenues: revenuesSelector.revenues,
    isRevenueSuccess: revenuesSelector.isRevenueSuccess,
    error: revenuesSelector.error,

  })
);

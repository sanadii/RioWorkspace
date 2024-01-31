// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectDailyRevenueState = state => state.DailyRevenue;

export const dailyRevenueSelector = createSelector(
  selectDailyRevenueState,
  (dailyRevenueSelector) => ({
    
    // Daily Revenues Selectors
    dailyRevenues: dailyRevenueSelector.dailyRevenues,
    isDailyRevenueSuccess: dailyRevenueSelector.isDailyRevenueSuccess,
    error: dailyRevenueSelector.error,

  })
);

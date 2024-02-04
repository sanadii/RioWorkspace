// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectAllStafftate = state => state.Staff;

export const allStaffSelector = createSelector(
  selectAllStafftate,
  (allStaffSelector) => ({
    
    // Daily Revenues Selectors
    allStaff: allStaffSelector.allStaff,
    isAllStaffuccess: allStaffSelector.isAllStaffuccess,
    error: allStaffSelector.error,

  })
);

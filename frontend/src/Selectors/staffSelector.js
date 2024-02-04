// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectAllStafftate = state => state.Staff;

export const staffSelector = createSelector(
  selectAllStafftate,
  (staffSelector) => ({
    
    // Daily Revenues Selectors
    allStaff: staffSelector.allStaff,
    isStaffSuccess: staffSelector.isStaffSuccess,
    error: staffSelector.error,

  })
);

// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectServiceState = state => state.Service;

export const serviceSelector = createSelector(
  selectServiceState,
  (serviceSelector) => ({
    
    // Daily Revenues Selectors
    services: serviceSelector.services,
    isServiceSuccess: serviceSelector.isServiceSuccess,
    error: serviceSelector.error,

  })
);

// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectServicesState = state => state.Service;

export const servicesSelector = createSelector(
  selectServicesState,
  (servicesSelector) => ({
    
    // Daily Revenues Selectors
    services: servicesSelector.services,
    isServiceSuccess: servicesSelector.isServiceSuccess,
    error: servicesSelector.error,

  })
);

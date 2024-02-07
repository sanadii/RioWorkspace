// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectRsourceState = state => state.Rsource;

export const resourcesSelector = createSelector(
  selectRsourceState,
  (resourcesSelector) => ({
    
    // Daily Revenues Selectors
    resources: resourcesSelector.resources,
    isRsourceSuccess: resourcesSelector.isRsourceSuccess,
    error: resourcesSelector.error,

  })
);

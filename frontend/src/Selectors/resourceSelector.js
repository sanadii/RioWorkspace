// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectResourceState = state => state.Resource;

export const resourceSelector = createSelector(
  selectResourceState,
  (resourceSelector) => ({
    
    // Daily Revenues Selectors
    resources: resourceSelector.resources,
    isResourceSuccess: resourceSelector.isResourceSuccess,
    error: resourceSelector.error,

  })
);

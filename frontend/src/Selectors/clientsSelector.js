// Selectors/electorSelector.js
import { createSelector } from 'reselect';

const selectClientState = state => state.Client;

export const clientsSelector = createSelector(
  selectClientState,
  (clientsSelector) => ({
    
    // Daily Revenues Selectors
    clients: clientsSelector.clients,
    clientSearch: clientsSelector.clientSearch,
    clientInfo: clientsSelector.clients,
    isClientSuccess: clientsSelector.isClientSuccess,
    error: clientsSelector.error,
    loading: clientsSelector.loading,

  })
);

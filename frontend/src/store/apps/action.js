import {
  CHANGE_APP,
} from './actionType';

export const changeActiveApp = layout => ({
  type: CHANGE_APP,
  payload: layout,
});

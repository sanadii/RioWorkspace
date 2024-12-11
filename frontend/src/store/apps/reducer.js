import {
  CHANGE_APP,
} from './actionType';

//Constants
import {
  Applications,
} from "Components/constants/apps";

const INIT_STATE = {
  activeApp: Applications.BOOKING,
};

const Apps = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_APP:
      return {
        ...state,
        activeApp: action.payload,
      };

    default:
      return state;
  }
};

export default Apps;

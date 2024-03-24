import {
  GET_SETTING_OPTIONS,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  UPDATE_SETTING_OPTION_SUCCESS,
  UPDATE_SETTING_OPTION_FAIL,
} from "./actionType";

const INIT_STATE = {
  settingOptions: [],
  error: {},
};

const SettingOptions = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_SETTING_OPTIONS:
          return {
            ...state,
            settingOptions: action.payload.data,
            isSettingOptionCreated: false,
            isSettingOptionsuccess: true
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_SETTING_OPTIONS:
          return {
            ...state,
            error: action.payload.error,
            isSettingOptionCreated: false,
            isSettingOptionsuccess: false
          };
        default:
          return { ...state };
      }

    case UPDATE_SETTING_OPTION_SUCCESS:
      return {
        ...state,
        settingOptions: state.settingOptions.map((settingOption) =>
          settingOption.id.toString() === action.payload.data.id.toString()
            ? { ...settingOption, ...action.payload.data }
            : settingOption
        ),
      };

    case UPDATE_SETTING_OPTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default SettingOptions;
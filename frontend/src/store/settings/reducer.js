import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  GET_SETTING_OPTIONS,
  UPDATE_SETTING_OPTION_SUCCESS,
  UPDATE_SETTING_OPTION_FAIL,

  GET_SETTINGS,
  GET_OPTION_CATEGORIES,
  ADD_OPTION_CATEGORY_SUCCESS,
  ADD_OPTION_CATEGORY_FAIL,
  UPDATE_OPTION_CATEGORY_SUCCESS,
  UPDATE_OPTION_CATEGORY_FAIL,
  DELETE_OPTION_CATEGORY_SUCCESS,
  DELETE_OPTION_CATEGORY_FAIL,

  GET_OPTION_CHOICES,
  ADD_OPTION_CHOICE_SUCCESS,
  ADD_OPTION_CHOICE_FAIL,
  UPDATE_OPTION_CHOICE_SUCCESS,
  UPDATE_OPTION_CHOICE_FAIL,
  DELETE_OPTION_CHOICE_SUCCESS,
  DELETE_OPTION_CHOICE_FAIL,
} from "./actionType";

const INIT_STATE = {
  settingOptions: [],
  settingOptionCategories: [],
  settingChoices: [],

  error: {},
};

const SettingOptions = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_SETTINGS:
          return {
            ...state,
            settingOptions: action.payload.data.settingOptions,
            settingChoices: action.payload.data.settingChoices,
            isSettingOptionCreated: false,
            isSettingOptionsuccess: true,
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
            isSettingOptionsuccess: false,
          };

        case GET_SETTINGS:
          return {
            ...state,
            settingOptionChoices: action.payload.data,
            isOptionChoiceCreated: false,
            isOptionChoiceSuccess: true,
          };
        case GET_OPTION_CATEGORIES:
          return {
            ...state,
            optionCategories: action.payload.data,
            isOptionCategoryCreated: false,
            isOptionCategorySuccess: true,
          };

        case GET_OPTION_CHOICES:
          return {
            ...state,
            optionChoices: action.payload.data,
            isOptionChoiceCreated: false,
            isOptionChoiceSuccess: true,
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



    // Setting Option Coices


    case ADD_OPTION_CATEGORY_SUCCESS:
      return {
        ...state,
        isOptionCategoryCreated: true,
        optionCategories: [...state.optionCategories, action.payload.data],
        isOptionCategoryAdd: true,
        isOptionCategoryAddFail: false,

      };

    case ADD_OPTION_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        isOptionCategoryAdd: false,
        isOptionCategoryAddFail: true,
      };

    case UPDATE_OPTION_CATEGORY_SUCCESS:
      return {
        ...state,
        optionCategories: state.optionCategories.map((optionCategory) =>
          optionCategory.id.toString() === action.payload.data.id.toString()
            ? { ...optionCategory, ...action.payload.data }
            : optionCategory
        ),
      };

    case UPDATE_OPTION_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_OPTION_CATEGORY_SUCCESS:

      return {
        ...state,
        optionCategories: state.optionCategories.filter(
          (optionCategory) => optionCategory.id.toString() !== action.payload.optionCategory.toString()
        ),
        isOptionCategoryDelete: true,
        isOptionCategoryFail: false,
      };

    case DELETE_OPTION_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        isOptionCategoryDelete: false,
        isOptionCategoryFail: true,

      };


    // Setting Option Choices
    case ADD_OPTION_CHOICE_SUCCESS:
      return {
        ...state,
        isOptionChoiceCreated: true,
        optionChoices: [...state.optionChoices, action.payload.data],
        isOptionChoiceAdd: true,
        isOptionChoiceAddFail: false,

      };

    case ADD_OPTION_CHOICE_FAIL:
      return {
        ...state,
        error: action.payload,
        isOptionChoiceAdd: false,
        isOptionChoiceAddFail: true,
      };

    case UPDATE_OPTION_CHOICE_SUCCESS:
      return {
        ...state,
        optionChoices: state.optionChoices.map((optionChoice) =>
          optionChoice.id.toString() === action.payload.data.id.toString()
            ? { ...optionChoice, ...action.payload.data }
            : optionChoice
        ),
      };

    case UPDATE_OPTION_CHOICE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_OPTION_CHOICE_SUCCESS:

      return {
        ...state,
        optionChoices: state.optionChoices.filter(
          (optionChoice) => optionChoice.id.toString() !== action.payload.optionChoice.toString()
        ),
        isOptionChoiceDelete: true,
        isOptionChoiceFail: false,
      };

    case DELETE_OPTION_CHOICE_FAIL:
      return {
        ...state,
        error: action.payload,
        isOptionChoiceDelete: false,
        isOptionChoiceFail: true,

      };

    default:
      return { ...state };
  }
};

export default SettingOptions;
import {
  GET_OPTION_CHOICES,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  ADD_OPTION_CHOICE_SUCCESS,
  ADD_OPTION_CHOICE_FAIL,
  UPDATE_OPTION_CHOICE_SUCCESS,
  UPDATE_OPTION_CHOICE_FAIL,
  DELETE_OPTION_CHOICE_SUCCESS,
  DELETE_OPTION_CHOICE_FAIL,
} from "./actionType";

const INIT_STATE = {
  optionChoices: [],
  error: {},
};

const OptionChoice = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_OPTION_CHOICES:
          return {
            ...state,
            optionChoices: action.payload.data,
            isOptionChoiceCreated: false,
            isOptionChoiceSuccess: true
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_OPTION_CHOICES:
          return {
            ...state,
            error: action.payload.error,
            isOptionChoiceCreated: false,
            isOptionChoiceSuccess: false
          };
        default:
          return { ...state };
      }

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

export default OptionChoice;
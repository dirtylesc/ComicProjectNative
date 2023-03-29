const {constants} = require('res/constants');

//Actions
const SET_DISABLED = 'set_disabled';
const SET_HIDE_PASSWORD = 'set_hide_password';
const SET_EMAIL = 'set_email';
const SET_PASSWORD = 'set_password';
const SET_IS_INVALID_PASSWORD = 'set_is_invalid_password';
const SUBMIT_CREATE = 'submit_create';

const setEmail = payload => {
  return {
    type: SET_EMAIL,
    payload,
  };
};

const setPassword = payload => {
  return {
    type: SET_PASSWORD,
    payload,
  };
};

const setDisabled = payload => {
  return {
    type: SET_DISABLED,
    payload,
  };
};

const setIsInvalidPassword = payload => {
  return {
    type: SET_IS_INVALID_PASSWORD,
    payload,
  };
};

const handlePassword = payload => {
  return {
    type: SET_HIDE_PASSWORD,
    payload,
  };
};

const handleSubmit = payload => {
  return {
    type: SUBMIT_CREATE,
    payload,
  };
};

export const functions = {
  setEmail,
  setPassword,
  setDisabled,
  handleSubmit,
  setIsInvalidPassword,
  handlePassword,
};

//useReducer
const ResigterReducer = (state, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case SET_DISABLED:
      return {
        ...state,
        disabled: action.payload,
      };
    case SET_IS_INVALID_PASSWORD:
      return {
        ...state,
        isInvalidPassword: action.payload,
      };
    case SET_HIDE_PASSWORD: {
      return {
        ...state,
        hidePassword: action.payload,
      };
    }
    case SUBMIT_CREATE: {
      if (
        state.email.match(constants.REG_EMAIL) &&
        state.password.match(constants.REG_PASSWORD)
      ) {
        return {
          ...state,
          isInvalidEmail: false,
        };
      } else {
        return {
          ...state,
          isInvalidEmail: true,
        };
      }
    }
    default:
      throw new Error('Invalid Action');
  }
};

export default ResigterReducer;

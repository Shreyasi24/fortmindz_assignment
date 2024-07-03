import { employeeDetail } from "./action";
import {
  DELETE_EMPLOYEE_FAIL_REQUEST,
  DELETE_EMPLOYEE_MAKE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS_REQUEST,
  EMPLOYEE_DETAIL_SUCCESS,
  FETCH_EMPLOYEE_FAIL_REQUEST,
  FETCH_EMPLOYEE_MAKE_REQUEST,
  FETCH_EMPLOYEE_SUCCESS_REQUEST,
  UPDATE_EMPLOYEE_DETAIL_FAIL,
  UPDATE_EMPLOYEE_DETAIL_REQUEST,
  UPDATE_EMPLOYEE_DETAIL_SUCCESS,
} from "./actionType";

const initialState = {
  loading: true,
  employeelist: [],
  error: "",
  employeeDetail: {},
};
export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEE_MAKE_REQUEST:
    case DELETE_EMPLOYEE_MAKE_REQUEST:
    case UPDATE_EMPLOYEE_DETAIL_REQUEST:
      return {
        ...state,
      };
    case FETCH_EMPLOYEE_SUCCESS_REQUEST:
      return {
        ...state,
        loading: false,
        employeelist: action.payload,
      };
    case FETCH_EMPLOYEE_FAIL_REQUEST:
    case DELETE_EMPLOYEE_FAIL_REQUEST:
    case UPDATE_EMPLOYEE_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_EMPLOYEE_SUCCESS_REQUEST:
      return {
        ...state,
        loading: false,
        employeelist: state.employeelist?.filter(
          (employee) => employee.id !== action.payload
        ),
      };
    case EMPLOYEE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        employeeDetail: action.payload,
      };
    case UPDATE_EMPLOYEE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        employeelist: state.employeelist?.map((employee) =>
          employee.id === +action.payload.id ? action.payload : employee
        ),
      };
    default:
      return state;
  }
};

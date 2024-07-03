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
import axios from "axios";
import { url } from "../utils/api";
import RateLimiter from "../utils/rateLimit";
import { toast } from "react-toastify";

const rateLimiter = new RateLimiter(5, 60000); // 5 requests per minute
export const fetchEmployee = () => async (dispatch) => {
  async function getData() {
    const res = await axios.get(`${url}/employees`);

    if (res?.status) {
      return res?.data;
    } else {
      toast.error(data?.message);
    }
  }
  try {
    dispatch({
      type: FETCH_EMPLOYEE_MAKE_REQUEST,
    });
    if (rateLimiter.tryRemoveToken()) {
      try {
        let data = await getData();

        dispatch({
          type: FETCH_EMPLOYEE_SUCCESS_REQUEST,
          payload: data.data,
        });
      } catch (err) {
        if (err.response && err.response.status === 429) {
          const retryAfter =
            parseInt(err.response.headers["retry-after"], 10) || 1;
          setTimeout(getData(), retryAfter * 1000);
        } else {
          window.alert("Failed to fetch employees. Please try again later.");
        }
      }
    } else {
    }
  } catch (err) {
    window.alert(err);
    dispatch({
      type: FETCH_EMPLOYEE_FAIL_REQUEST,
      payload: err.message,
    });
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_EMPLOYEE_MAKE_REQUEST,
    });
    const dltdata = await axios.delete(`${url}/delete/${id}`);

    if ((dltdata.status = 200)) {
      toast.success(dltdata?.data?.message);
      dispatch({
        type: DELETE_EMPLOYEE_SUCCESS_REQUEST,
        payload: id,
      });
    } else {
      toast.error(dltdata?.message);
    }
  } catch (err) {
    dispatch({
      type: DELETE_EMPLOYEE_FAIL_REQUEST,
      payload: err.message,
    });
  }
};

export const employeeDetail = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/employee/${id}`);

    dispatch({
      type: EMPLOYEE_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_EMPLOYEE_FAIL_REQUEST,
      payload: err.message,
    });
  }
};

export const updateDetail = (uData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_EMPLOYEE_DETAIL_REQUEST,
    });
    const resData = await axios.put(`${url}/update/${uData.id}`, uData);

    if (resData.data.status == "success") {
      toast.success("Employee data has been updated");
      dispatch({
        type: UPDATE_EMPLOYEE_DETAIL_SUCCESS,
        payload: resData.data.data,
      });
    } else {
      toast.error("Employee data has not been updated");
    }
  } catch (err) {
    dispatch({
      type: UPDATE_EMPLOYEE_DETAIL_FAIL,
      payload: err.message,
    });
  }
};

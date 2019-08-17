import { actionCreators } from "./actions";
import { Dispatch } from "redux";
import { push } from "connected-react-router";
import { apiPost } from "../../api";
import storage from "../storage";
import constants from "./constants";

const login = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(actionCreators.login.started());

    try {
      const response = await apiPost(
        "/api/v1/login",
        {
          body: {
            username,
            password
          }
        },
        { enableConvertJsonToForm: true, disable401Handler: true }
      );
      storage.setLoginUser(response.data);
      dispatch(actionCreators.login.done(response.data));
      dispatch(actionCreators.createAuthEvent(constants.eventTypes.LOGGED_IN));
      dispatch(push("/"));
    } catch (err) {
      dispatch(actionCreators.login.failed());
      dispatch(
        actionCreators.createAuthEvent(constants.eventTypes.FAILED_TO_LOGIN)
      );
    }
  };
};

const logout = () => {
  return async (dispatch: Dispatch) => {
    dispatch(actionCreators.logout.started());

    try {
      await apiPost("/api/v1/logout");
      storage.deleteLoginUser();
      dispatch(actionCreators.logout.done());
      dispatch(push("/login"));
    } catch (err) {
      dispatch(actionCreators.logout.failed());
    }
  };
};

const signUp = (username: string, email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(actionCreators.signUp.started());

    try {
      const response = await apiPost("/api/v1/users", {
        body: {
          username: username,
          email: email,
          password: password
        }
      });
      storage.setLoginUser(response.data);
      dispatch(actionCreators.signUp.done(response.data));
      dispatch(push("/"));
    } catch (err) {
      dispatch(actionCreators.signUp.failed());
    }
  };
};

export default {
  login,
  logout,
  signUp,
  createAuthEvent: actionCreators.createAuthEvent,
  deleteAuthEvent: actionCreators.deleteAuthEvent
};

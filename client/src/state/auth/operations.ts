import { Dispatch } from "redux";
import { apiPost } from "@api";
import storage from "@state/storage";
import { eventTypes } from "@state/events/constants";
import eventsACs from "@state/events/actions";
import { authACs } from ".";

function login(username: string, password: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authACs.startLoading());
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
      dispatch(authACs.setLoginUser(response.data));
      dispatch(authACs.finishLoading());
      dispatch(eventsACs.createEntity(eventTypes.LOGGED_IN));
    } catch (err) {
      dispatch(authACs.finishLoading());
      dispatch(eventsACs.createEntity(eventTypes.FAILED_TO_LOGIN));
    }
  };
}

function logout() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authACs.startLoading());
      await apiPost("/api/v1/logout");
      storage.deleteLoginUser();
      dispatch(authACs.setLoginUser(null));
      dispatch(authACs.finishLoading());
      dispatch(eventsACs.createEntity(eventTypes.LOGGED_OUT));
    } catch (err) {
      dispatch(authACs.finishLoading());
    }
  };
}

function signUp(username: string, email: string, password: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authACs.startLoading());
      const response = await apiPost("/api/v1/users", {
        body: {
          username: username,
          email: email,
          password: password
        }
      });
      storage.setLoginUser(response.data);
      dispatch(authACs.setLoginUser(response.data));
      dispatch(authACs.finishLoading());
      dispatch(eventsACs.createEntity(eventTypes.SIGNED_UP));
    } catch (err) {
      dispatch(authACs.finishLoading());
    }
  };
}

export default {
  login,
  logout,
  signUp
};

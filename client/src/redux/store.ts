import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";

export const GET_CURRENT_USER = "get current user";

function authReducer(state = null, action: { type: any; payload: any; }) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.payload || false; //sets auth to false when action.payload === ''
    default:
      return state;
  }
}

export const store = configureStore({
  reducer: combineReducers({auth: authReducer}),
  // preloadedState: {
  //   auth: { authenticated: localStorage.getItem("token"), errorMessage: "" },
  // },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxThunk),
});


//infer and export the types of state and dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

export const store = configureStore({
    reducer: reducers,
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
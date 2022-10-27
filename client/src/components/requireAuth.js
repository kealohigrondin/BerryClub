import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function requireAuth(ChildComponent) {
  return function ComposedComponent(props) {
    //navigates back to the root page if auth is false
    const auth = useSelector((state) => state.auth);
    console.log(auth);

    if (auth === false) {
      console.log("RrquireAuth HOC blocked navigation");
      return <Navigate to="/" />;
    }

    return <ChildComponent {...props} />;
  };
}

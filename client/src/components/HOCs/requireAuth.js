import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function requireAuth(ChildComponent) {
  return function ComposedComponent(props) {
    //navigates back to the root page if auth is false
    const auth = useSelector((state) => state.auth);
    const { pathname } = useLocation();

    if (auth === false) {
      console.log("requireAuth HOC blocked navigation to", pathname);
      return <Navigate to="/" />;
    }

    return (
      <div className="ui segment">
        <ChildComponent {...props} />
      </div>
    );
  };
}

import React, {ComponentType} from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate, useLocation } from "react-router-dom";

export default function requireAuth<P>(ChildComponent: ComponentType<P>) {
  return (props: any) => {
    //navigates back to the root page if auth is false
    const auth = useAppSelector((state) => state.auth);
    const { pathname } = useLocation();

    if (auth === false) {
      console.debug("requireAuth HOC blocked navigation to", pathname);
      return <Navigate to="/"/>;
    }

    return <ChildComponent {...props}/>;
  };
}

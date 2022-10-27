import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

export default function requireAuth(ChildComponent) {
  class ComposedComponent extends React.Component {
    //navigates back to the root page if this.props.auth is false
    render() {
      console.log(this.props.auth);
      if (!this.props.auth) console.log("requireAuth HOC blocked navigation");
      return (
        <>
          {!this.props.auth && <Navigate to="/" />}
          <ChildComponent {...this.props} />
        </>
      );
    }
  }
  const mapStateToProps = (state) => {
    return { auth: state.auth };
  };

  return connect(mapStateToProps)(ComposedComponent);
}

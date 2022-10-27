import React from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";

import Nav from "../Nav";
import Welcome from "./Welcome";
import Dashboard from "../components/Dashboard";
// import SignUp from "../components/auth/SignUp";
// import SignIn from "./auth/SignIn";
// import SignOut from "./auth/SignOut";

import { getCurrentUser } from "../../actions";

class App extends React.Component {
  constructor(props) {
    super(props);
    //see if user is logged in with google already
    this.props.getCurrentUser();
  }

  render() {
    return (
      <>
        <Nav />
        <div className="ui container">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/signup" element={<SignUp />} /> */}
            {/* <Route path="/signin" element={<SignIn />} /> */}
            {/* <Route path="/signout" element={<SignOut />} /> */}
          </Routes>
        </div>
      </>
    );
  }
}

export default connect(null, { getCurrentUser })(App);

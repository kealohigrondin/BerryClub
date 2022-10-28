import React from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";

import Nav from "./Nav";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Recipes from "./pages/Recipes";

import { getCurrentUser } from "../actions";

class App extends React.Component {
  constructor(props) {
    super(props);
    //see if user is logged in with google already
    this.props.getCurrentUser();
  }

  render() {
    return (
      <div style={{ height: "100vh", background: "darkslateblue" }}>
        <Nav />
        <div className="ui container">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recipes" element={<Recipes />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default connect(null, { getCurrentUser })(App);

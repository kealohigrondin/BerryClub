import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { changeAuth } from "../actions/index";

function Nav() {
  const auth = useSelector((state) => state.auth);
  const renderRightMenu = () => {
    switch (auth) {
      case null: //neither
        return "Still deciding";
      default: //logged in
        return (
          <a href="/auth/logout" className="item">
            Sign Out
          </a>
        );
    }
  };

  if (!auth) {
    return null;
  }

  return (
    <div className="ui container">
      <div className="ui menu" style={{ marginBottom: "2em" }}>
        <Link to="/dashboard" className="item">
          <i className="icon home" />
        </Link>
        <Link to="/recipes" className="item">Recipes</Link>
        <div className="right menu">{renderRightMenu()}</div>
      </div>
    </div>
  );
}

export default Nav;

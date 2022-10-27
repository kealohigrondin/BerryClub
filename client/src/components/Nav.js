import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { changeAuth } from "../actions/index";

class Nav extends React.Component {
  renderRightMenu() {
    switch (this.props.auth) {
      case null: //neither
        return "Still deciding";
      case false: //not logged in
        return (
          <a href="/auth/google" className="item">
            <i className="google icon" />
            Login with Google
          </a>
        );
      default: //logged in
        return (
          <a href="/auth/logout" className="item">
            Sign Out
          </a>
        );
    }
  }
  render() {
    return (
      <div className="ui primary menu" style={{ marginBottom: "2em" }}>
        <Link to={this.props.auth ? '/dashboard' : '/'} className="item">
          Home
        </Link>
        <div className="right menu">{this.renderRightMenu()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(Nav);

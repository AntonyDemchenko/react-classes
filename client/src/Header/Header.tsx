import React from "react";
import "./Header.css";
// import store from "../Store/Store";
import emitter from "../EventEmitter";
import { connect } from "react-redux";

type PropsType = {
  username?: any;
};

type StateType = {
  username: string;
};
class Header extends React.Component<PropsType, StateType> {
  state: StateType;

  constructor(props: PropsType) {
    super(props);

    this.state = {
      username: this.props.username,
    };
  }

  logOut(): void {
    localStorage.clear();
    emitter.emit("event: check-login", { login: "" });
  }
  render() {

    return (
      <header className="main-header">
        <div className="header__user">
          <div className="header__icon"></div>
          <p className="header__user-title">user:</p>
          <p className="header__username">{this.props.username}</p>
        </div>
        <button className="header__logout" onClick={this.logOut}>
          Log out
        </button>
      </header>
    );
  }
}

const mapStateToProps = (state: any) => {


  return {
    username: state.todo.user,

  }
}

export default connect(mapStateToProps, null)(Header);

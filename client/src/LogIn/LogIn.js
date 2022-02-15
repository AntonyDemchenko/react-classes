import React from "react";
import "./LogIn.css";
import { NavLink } from "react-router-dom";
class LogIn extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  async login(data) {
    const newData = JSON.stringify(data);
    // console.log("::::::::::::::::::::::::::::", newData);
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newData,
    });
    return response.json();
  }

  handleSubmit(event) {
    // console.log(this.state);
    this.login(this.state).then((data) => {
      //   console.log(data);
    });
    event.preventDefault();
    localStorage.setItem("token", JSON.stringify(this.state));
    this.setState({ username: "", password: "" });
  }

  setUserName(e) {
    this.setState({ username: e });
  }

  setPassword(e) {
    this.setState({ password: e });
  }

  render() {
    return (
      <div className="login">
        <h1 className="login_title">LOG IN</h1>
        <form
          className="login_form"
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={(e) => this.setUserName(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={(e) => this.setPassword(e.target.value)}
          />

          <div className="submit">
            <button
              className="submit_btn"
              type="submit"
              value={this.state.password}
            >
              <NavLink to="/todo" className="todo-link">
                Submit
              </NavLink>
            </button>
          </div>
        </form>
        {/* <div>======================================================</div> */}
        <div className="links">
          <NavLink to="/registration" className="sign-up">
            Sign up!
          </NavLink>
        </div>
      </div>
    );
  }
}

export default LogIn;

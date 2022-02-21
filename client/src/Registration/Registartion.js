import React from "react";
import { NavLink } from "react-router-dom";
import "./Registration.css";
import emitter from "../EventEmitter";
class Registration extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
    };

    this.loginRef = React.createRef();
  }
  async registration(data) {
    const newData = JSON.stringify(data);

    const response = await fetch("http://localhost:3000/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newData,
    });
    return response.json();
  }

  handleSubmit(event) {
    this.registration(this.state).then((data) => {
      console.log("reg", data);
      localStorage.setItem(
        "token",
        JSON.stringify({
          accessToken: data.accesstoken,
          refreshToken: data.refreshToken,
        })
      );
      this.detectRegistration(data.status);

      // if (data.status === 200) {
      // emitter.emit("event: check-login", { login: "" });
      // }
    });
    event.preventDefault();
    this.setState({ username: "", password: "" });
  }

  detectRegistration(succesStatus) {
    if (succesStatus === 200) {
      this.loginRef.current.click();
      // emitter.emit("event: check-login", { login: "" });
    }
  }

  setUserName(e) {
    this.setState({ username: e });
  }

  setPassword(e) {
    this.setState({ password: e });
  }

  render() {
    return (
      <div className="reg">
        <h1 className="reg_title">Registration</h1>

        <form
          className="reg_form"
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
              Submit
            </button>
          </div>
        </form>
        <NavLink to="/" className="sign-in" ref={this.loginRef}>
          Sign in!
        </NavLink>
      </div>
    );
  }
}

export default Registration;

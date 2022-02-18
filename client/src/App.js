import React from "react";
import "./App.css";

import api from "./api";
import emitter from "./EventEmitter";
import { Routes, Route } from "react-router-dom";
import LogIn from "./LogIn/LogIn";
import Registration from "./Registration/Registartion";
import TodoApp from "./TodoApp/TodoApp";

import store from "./Store/Store";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      login: "start",
    };
  }

  componentDidMount() {
    emitter.subscribe("event: check-login", (data) => {
      // console.log("[[[[[[[[[[[[[[[[[[[", data.login);
      this.checkLogin(data.login);
    });
  }

  checkLogin(data) {
    this.setState({
      login: data,
    });
  }

  getToken() {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  }
  render() {
    return (
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={this.state.login ? <TodoApp /> : <LogIn />}
          ></Route>

          <Route path="/registration" element={<Registration />}></Route>
        </Routes>
      </div>
    );
    // }
  }
}

export default App;

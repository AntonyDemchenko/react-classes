import React from "react";
import "./App.css";

import api from "./api";
import emitter from "./EventEmitter";
import { Routes, Route } from "react-router-dom";
import LogIn from "./LogIn/LogIn";
import Registration from "./Registration/Registartion";
import TodoApp from "./TodoApp/TodoApp";
import Header from "./Header/Header";

import store from "./Store/Store";

type StateType = {
  login: string;
};

class App extends React.Component<{}, StateType> {
  constructor(props: string) {
    super(props);

    this.state = {
      login: "start",
    };
  }

  componentDidMount() {
    emitter.subscribe("event: check-login", (data: StateType) => {
      // console.log("[[[[[[[[[[[[[[[[[[[", data.login);
      this.checkLogin(data.login);
    });
  }

  checkLogin(data: string) {
    this.setState({
      login: data,
    });
  }

  render() {
    return (
      <>
        {this.state.login ? <Header /> : <></>}
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={this.state.login ? <TodoApp /> : <LogIn />}
            ></Route>

            <Route path="/registration" element={<Registration />}></Route>
          </Routes>
        </div>
      </>
    );
    // }
  }
}

export default App;

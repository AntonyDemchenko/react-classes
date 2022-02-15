import React from "react";
import "./App.css";

import api from "./api";

import { Routes, Route } from "react-router-dom";
import LogIn from "./LogIn/LogIn";
import Registration from "./Registration/Registartion";
import TodoApp from "./TodoApp/TodoApp";

class App extends React.Component {
  // setToken() {
  //   localStorage.setItem(
  //     "token",
  //     JSON.stringify({ username: "", password: "" })
  //   );
  // }

  getToken() {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  }
  render() {
    // this.setToken();
    // const token = this.getToken();
    // if (token.username === "test" && token.password === "123") {
    //   return (
    //     <div className="container">
    //       <TodoApp />
    //     </div>
    //   );
    // } else {
    return (
      <div className="container">
        <Routes>
          <Route path="/" exact element={<LogIn />}></Route>
          <Route path="/todo" element={<TodoApp />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
        </Routes>
      </div>
    );
    // }
  }
}

export default App;

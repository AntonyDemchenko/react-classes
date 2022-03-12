import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./rootReducer";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas";

const saga = createSagaMiddleware()

const store = createStore(rootReducer,
    compose(applyMiddleware(saga),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

saga.run(rootSaga)

export default store
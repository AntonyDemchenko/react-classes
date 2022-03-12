import { call, put, takeEvery, all } from "redux-saga/effects"
import api from "../api"
import emitter from "../EventEmitter"
import {
    GET_ALL_TODOS,
    CREATE_TODO,
    SET_TODOS,
    CHECK_ALL_TODOS,
    DELETE_TODO,
    CHECK_TODO,
    DELETE_ALL_CHECKED,
} from './types'

export function* getDataWatcher() {

    yield takeEvery(GET_ALL_TODOS, getDataWorker)
}

function* getDataWorker() {
    try {

        const payload = yield api.getDataFromDB()


        yield put({ type: SET_TODOS, payload })

        if (payload.tokens) {
            yield localStorage.setItem("token", JSON.stringify(payload.tokens));
        }
    } catch (error) {
        console.error(error);
        emitter.emit("event: check-login", { login: false });
    }
}

//-------------------------------------------------------

export function* createWatcher() {

    yield takeEvery(CREATE_TODO, createWorker)
}

function* createWorker({ payload }) {
    try {

        yield call(api.addNewItemDB, payload)
    } catch (error) {
        console.error(error);
    }
}

//-------------------------------------------------------

export function* checkAllWatcher() {

    yield takeEvery(CHECK_ALL_TODOS, checkAllWorker)
}

function* checkAllWorker({ payload }) {
    try {

        yield call(api.checkAllTodosDB, payload)
    } catch (error) {
        console.error(error);
    }
}

//-------------------------------------------------------

export function* deleteWatcher() {

    yield takeEvery(DELETE_TODO, deleteWorker)
}

function* deleteWorker({ payload }) {
    try {

        yield call(api.deleteItemFromDB, payload)
    } catch (error) {
        console.error(error);
    }
}

//-------------------------------------------------------

export function* checkWatcher() {

    yield takeEvery(CHECK_TODO, checkWorker)
}

function* checkWorker({ payload }) {
    try {

        yield call(api.changeCompletedStatusOfItemDB, payload)
    } catch (error) {
        console.error(error);
    }
}

//-------------------------------------------------------

export function* deleteCheckedWatcher() {

    yield takeEvery(DELETE_ALL_CHECKED, deleteCheckedWorker)
}

function* deleteCheckedWorker() {
    try {
        yield call(api.deleteAllCheckedTodosDB)
    } catch (error) {
        console.error(error);
    }
}

//-------------------------------------------------------

export default function* rootSaga() {
    yield all([
        getDataWatcher(),
        createWatcher(),
        checkAllWatcher(),
        deleteWatcher(),
        checkWatcher(),
        deleteCheckedWatcher()
    ])
}
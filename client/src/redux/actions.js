import {
    CREATE_TODO,
    GET_ALL_TODOS,
    DELETE_TODO,
    CHECK_TODO,
    TOGGLE_FILTER,
    DELETE_ALL_CHECKED,
    CHECK_ALL_TODOS,
    SET_TODOS,
} from "./types";

export function createTodo(todo) {
    return {
        type: CREATE_TODO,
        payload: todo,
    }
}

export function getAllTodos(todos) {
    return {
        type: GET_ALL_TODOS,
        payload: todos,
    }
}
export function setTodos(todos) {
    return {
        type: SET_TODOS,

    }
}

export function deleteTodo(id) {
    return {
        type: DELETE_TODO,
        payload: id,
    }
}

export function checkTodo(id, completed) {
    return {
        type: CHECK_TODO,
        payload: { id, completed }
    }
}

export function toggleFilter(filyerType) {
    return {
        type: TOGGLE_FILTER,
        payload: filyerType,
    }
}

export function deleteAllChecked(filyerType) {
    return {
        type: DELETE_ALL_CHECKED,

    }
}

export function checkAllTodos(checkType) {
    return {
        type: CHECK_ALL_TODOS,
        payload: checkType

    }
}
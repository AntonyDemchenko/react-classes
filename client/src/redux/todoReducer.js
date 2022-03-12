import {
    CREATE_TODO,
    DELETE_TODO,
    CHECK_TODO,
    TOGGLE_FILTER,
    DELETE_ALL_CHECKED,
    CHECK_ALL_TODOS,
    SET_TODOS
} from "./types";

const initialState = { todos: [], filterType: "all", user: "" }

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TODO:
            return { ...state, todos: [...state.todos, action.payload] };
        case SET_TODOS:
            return { ...state, ...action.payload };
        case DELETE_TODO:
            return { ...state, todos: state.todos.filter(item => action.payload !== item.todo_id) };
        case DELETE_ALL_CHECKED:
            return { ...state, todos: state.todos.filter(item => item.completed === false) };
        case CHECK_ALL_TODOS:
            return {
                ...state, todos: state.todos.map(item => {
                    if (action.payload) {
                        item.completed = true
                        return item
                    } else {
                        item.completed = false
                        return item
                    }

                })
            };
        case CHECK_TODO:
            return {
                ...state, todos: state.todos.map(item => {
                    if (item.todo_id === action.payload.id) {
                        item.completed = !item.completed
                        // console.log(item)
                    }
                    return item
                })

            };
        case TOGGLE_FILTER:
            return { ...state, filterType: action.payload };

        default: return state;
    }


}
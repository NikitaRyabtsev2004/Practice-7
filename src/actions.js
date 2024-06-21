// Action Types
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SET_FILTER = 'SET_FILTER';

const Filters = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
  CURRENT: 'CURRENT'
};

const addTodo = (content) => ({ type: ADD_TODO, payload: content });
const toggleTodo = (id) => ({ type: TOGGLE_TODO, payload: id });
const deleteTodo = (id) => ({ type: DELETE_TODO, payload: id });
const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });

export { ADD_TODO, TOGGLE_TODO, DELETE_TODO, SET_FILTER, Filters, addTodo, toggleTodo, deleteTodo, setFilter };

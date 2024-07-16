import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

export const PostContext = createContext();

const initialState = {
  loading: false,
  error: "",
  todos: [],
  addModal: false,
  editModal: false,
  filteredTodos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_TODOS":
      return { ...state, todos: action.payload, filteredTodos: action.payload };
    case "SET_FILTERED_TODOS":
      return { ...state, filteredTodos: action.payload };
    case "TOGGLE_ADD_MODAL":
      return { ...state, addModal: !state.addModal };
    case "TOGGLE_EDIT_MODAL":
      return { ...state, editModal: !state.editModal };
    default:
      return state;
  }
};

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchTodos = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.get("http://localhost:3000/students");
      dispatch({ type: "SET_TODOS", payload: res.data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const createTodo = async (todo) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.post("http://localhost:3000/students", todo);
      dispatch({ type: "SET_TODOS", payload: [...state.todos, res.data] });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const deleteTodo = async (id) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await axios.delete(`http://localhost:3000/students/${id}`);
      dispatch({
        type: "SET_TODOS",
        payload: state.todos.filter((todo) => todo.id !== id),
      });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const updateTodo = async (todo) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.put(
        `http://localhost:3000/students/${todo.id}`,
        todo
      );
      dispatch({
        type: "SET_TODOS",
        payload: state.todos.map((item) =>
          item.id === todo.id ? res.data : item
        ),
      });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const searchTodos = (e) => {
    const text = e.target.value;
    const newTodos = state.todos.filter(
      (todo) =>
        todo.firstName.toLowerCase().includes(text.toLowerCase()) ||
        todo.lastName.toLowerCase().includes(text.toLowerCase())
    );
    dispatch({ type: "SET_FILTERED_TODOS", payload: newTodos });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <PostContext.Provider
      value={{
        state,
        dispatch,
        fetchTodos,
        createTodo,
        deleteTodo,
        updateTodo,
        searchTodos,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

import { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import TodoList from "./TodoList";
import Loader from "./Loader";
import Error from "./Error";
import AddTodo from "./AddTodo";
import { PostContext } from "../Contexts/MainContext";

function Todos() {
  const { state, dispatch, searchTodos } = useContext(PostContext);

  return (
    <div>
      <h1 className="text-center">Students {state.todos.length}</h1>
      <div className="d-flex justify-content-between align-content-center pb-5 container">
        <input
          type="text"
          className="form-control"
          placeholder="Ism va Familiya orqali qidiring!!!"
          onChange={searchTodos}
          style={{ width: "360px" }}
        />

        <button
          onClick={() => dispatch({ type: "TOGGLE_ADD_MODAL", payload: true })}
          className="btn btn-dark d-flex gap-2 align-items-center"
        >
          <FaPlus />
          <span>Add</span>
        </button>
      </div>

      {state.addModal && (
        <AddTodo
          addModal={state.addModal}
          handleClose={() => dispatch({ type: "TOGGLE_ADD_MODAL" })}
          todos={state.todos}
        />
      )}

      {state.error && <Error error={state.error} />}

      {state.loading && <Loader />}

      {state.filteredTodos.length > 0 && (
        <TodoList
        // todos={state.filteredTodos}
        // setAddModal={setAddModal}
        // editModal={editModal}
        // setEditModal={setEditModal}
        // deleteTodo={deleteTodo}
        // updateTodo={updateTodo}
        />
      )}
    </div>
  );
}

export default Todos;

import { useState, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditTodo from "./EditTodo";
import { PostContext } from "../Contexts/MainContext";

const TodoList = () => {
  const { state, dispatch, deleteTodo, updateTodo } = useContext(PostContext);
  const [todoEditing, setTodoEditing] = useState({});

  const handleDelete = (id) => {
    if (confirm("Ochirishni xohlaysizmi?")) {
      deleteTodo(id);
    }
  };

  const handleEdit = (todo) => {
    dispatch({ type: "TOGGLE_EDIT_MODAL", payload: true });
    setTodoEditing(todo);
  };

  return (
    <>
      {state.editModal && (
        <EditTodo
          editModal={state.editModal}
          handleClose={() =>
            dispatch({ type: "TOGGLE_EDIT_MODAL", payload: false })
          }
          updateTodo={updateTodo}
          todos={state.todos}
          todoEditing={todoEditing}
        />
      )}

      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Group</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.filteredTodos?.map((todo, i) => (
            <tr key={todo.id} className="">
              <td>{i + 1}</td>
              <td>{todo.firstName}</td>
              <td>{todo.lastName}</td>
              <td>{todo.group}</td>
              <td className="d-flex gap-2 ">
                <button
                  onClick={() => handleEdit(todo)}
                  className="btn btn-sm btn-success d-flex gap-2 align-items-center"
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="btn btn-sm btn-danger  d-flex gap-2 align-items-center"
                >
                  <MdDelete />
                  <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TodoList;
